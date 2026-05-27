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

app.use(helmet());
app.use(compression());
app.use(cors({ origin: (process.env.CORS_ORIGIN || "*").split(",") }));
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

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, "0.0.0.0", () => console.log(`API on :${PORT}`));
