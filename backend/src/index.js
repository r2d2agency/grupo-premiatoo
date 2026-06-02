import "dotenv/config";
import express from "express";
import helmet from "helmet";
import compression from "compression";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const prisma = new PrismaClient();
const app = express();

app.set('trust proxy', 1);

// Helper to mask sensitive information
const maskString = (str) => {
  if (!str) return 'undefined';
  if (str.length < 10) return '***';
  return str.substring(0, 5) + '...' + str.substring(str.length - 5);
};

console.log('--- Startup Config ---');
const dbUrl = process.env.DATABASE_URL || '';
// Mask database password
const maskedDbUrl = dbUrl.replace(/:([^:@]+)@/, ':****@');
console.log('DATABASE_URL:', maskedDbUrl);
console.log('----------------------');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.use(compression());
app.use(express.json({ limit: "1mb" }));

const JWT_SECRET = process.env.JWT_SECRET || "change-me-in-production";

function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "missing token" });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "invalid token" });
  }
}

app.get("/health", (_req, res) => res.json({ ok: true }));

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "premiatto",
    format: async (req, file) => "webp",
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      return file.fieldname + "-" + uniqueSuffix;
    },
    transformation: [{ quality: "auto:good", fetch_format: "webp" }],
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", auth, upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.json({ url: req.file.path || req.file.secure_url });
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: "missing fields" });
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "invalid credentials" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "invalid credentials" });
    const token = jwt.sign({ sub: user.id, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Internal Server Error", message: err.message });
  }
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password, name } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: "missing fields" });
    
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: "user already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        role: "admin"
      }
    });

    const token = jwt.sign({ sub: user.id, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: "Internal Server Error", message: err.message });
  }
});

app.get("/api/content", async (_req, res) => {
  try {
    const row = await prisma.siteContent.findUnique({ where: { id: 1 } });
    res.json(row?.data || {});
  } catch (err) {
    res.status(500).json({ error: "Error fetching content", message: err.message });
  }
});

app.put("/api/content", auth, async (req, res) => {
  try {
    const data = req.body;
    const row = await prisma.siteContent.upsert({
      where: { id: 1 },
      update: { data },
      create: { id: 1, data },
    });
    res.json({ ok: true, updatedAt: row.updatedAt });
  } catch (err) {
    res.status(500).json({ error: "Error updating content", message: err.message });
  }
});

// User Management Endpoints
app.get("/api/users", auth, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true, createdAt: true }
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error fetching users", message: err.message });
  }
});

app.post("/api/users", auth, async (req, res) => {
  try {
    const { email, password, name, role } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: "missing fields" });
    
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: "user already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        role: role || "admin"
      }
    });

    res.status(201).json({ id: user.id, email: user.email, name: user.name, role: user.role });
  } catch (err) {
    res.status(500).json({ error: "Error creating user", message: err.message });
  }
});

app.delete("/api/users/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id } });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Error deleting user", message: err.message });
  }
});

app.put("/api/users/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, role } = req.body || {};
    
    const user = await prisma.user.update({
      where: { id },
      data: {
        email,
        name,
        role
      },
      select: { id: true, email: true, name: true, role: true, createdAt: true }
    });
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Error updating user", message: err.message });
  }
});

app.put("/api/users/:id/password", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body || {};
    if (!password) return res.status(400).json({ error: "missing password" });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword }
    });
    
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Error updating password", message: err.message });
  }
});


app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Internal Server Error", message: err.message });
});

const PRIMARY_PORT = Number(process.env.PORT) || 4000;

const logTables = async () => {
  try {
    const tables = await prisma.$queryRaw`SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'`;
    console.log("Current tables in public schema:", tables.map(t => t.tablename).join(', '));
    return tables.map(t => t.tablename);
  } catch (e) {
    console.error("Error listing tables:", e.message);
    return [];
  }
};

const startupCheck = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected: true");
    await logTables();
  } catch (e) {
    console.error("Database connection failed:", e.message);
  }

  console.log("Startup database check complete.");
};

const startServer = (port, runStartupCheck = false) => {
  const server = app.listen(port, "0.0.0.0", async () => {
    console.log(`API running on port ${port}`);
    if (runStartupCheck) await startupCheck();
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.warn(`Port ${port} already in use, skipping this listener.`);
      return;
    }

    throw error;
  });
};

const ports = Array.from(new Set([PRIMARY_PORT, 4000, 3000]));
ports.forEach((port, index) => startServer(port, index === 0));
