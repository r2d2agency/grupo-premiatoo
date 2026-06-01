import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

// Trust proxy if behind a reverse proxy (like EasyPanel/Nginx)
app.set('trust proxy', 1);

// Configure CORS
const allowedOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',').map(o => o.trim()) 
  : ['*'];

console.log('Allowed Origins:', allowedOrigins);

const corsOptions = {
  origin: function (origin, callback) {
    // No origin (like mobile apps/curl) is always allowed
    if (!origin) return callback(null, true);
    
    // Check if origin is in our allowed list
    if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // For debugging and to avoid hard-blocking during setup, log but allow
    console.warn(`CORS: Origin ${origin} not explicitly allowed but letting it pass for debugging. Allowed:`, allowedOrigins);
    callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Temporarily disabled helmet to debug CORS
// app.use(helmet(...));
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

app.post("/api/auth/login", async (req, res) => {
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
});

app.get("/api/content", async (_req, res) => {
  const row = await prisma.siteContent.findUnique({ where: { id: 1 } });
  res.json(row?.data || {});
});

app.put("/api/content", auth, async (req, res) => {
  const data = req.body;
  const row = await prisma.siteContent.upsert({
    where: { id: 1 },
    update: { data },
    create: { id: 1, data },
  });
  res.json({ ok: true, updatedAt: row.updatedAt });
});

// Error handling
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Internal Server Error", message: err.message });
});

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, "0.0.0.0", async () => {
  console.log(`API running on port ${PORT}`);
  console.log(`Database connected: ${!!process.env.DATABASE_URL}`);
  
  // Auto-seed admin if not exists
  const ensureAdmin = async (retryCount = 0) => {
    try {
      const email = process.env.ADMIN_EMAIL || 'admin@premiatto.com';
      const password = process.env.ADMIN_PASSWORD || 'premiatto123';
      const hash = await bcrypt.hash(password, 10);
      
      await prisma.user.upsert({
        where: { email },
        update: { password: hash },
        create: { email, password: hash, name: "Admin", role: "admin" },
      });
      console.log(`Admin user ensured: ${email}`);
    } catch (err) {
      if ((err.code === 'P2021' || err.message.includes('does not exist')) && retryCount < 10) {
        console.log(`Database tables not ready yet (attempt ${retryCount + 1}/10), retrying in 3s...`);
        setTimeout(() => ensureAdmin(retryCount + 1), 3000);
      } else {
        console.error("Database sync/seed error:", err.message);
      }
    }
  };

  ensureAdmin();
});
