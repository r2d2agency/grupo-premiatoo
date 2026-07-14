import "dotenv/config";
import express from "express";
import helmet from "helmet";
import compression from "compression";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();
const app = express();


app.set('trust proxy', 1);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(compression());
app.use(express.json({ limit: "1mb" }));

// Static uploads folder
const uploadsDir = process.env.UPLOADS_DIR || path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use("/uploads", express.static(uploadsDir));

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

// Local Storage Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", auth, upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  
  // Construct URL based on host
  const protocol = req.protocol;
  const host = req.get("host");
  const url = `${protocol}://${host}/uploads/${req.file.filename}`;
  
  res.json({ url });
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

// ==================== LEADS (CRM) ====================
const LEAD_STATUSES = ["novo", "em_contato", "qualificado", "ganho", "perdido"];

function renderTemplate(tpl, data) {
  return String(tpl || "").replace(/\{\{(\w+)\}\}/g, (_, k) => (data[k] ?? ""));
}

async function sendLeadEmail(lead) {
  try {
    const cfg = await prisma.smtpConfig.findUnique({ where: { id: 1 } });
    if (!cfg || !cfg.enabled || !cfg.host || !cfg.recipients) return;
    const transporter = nodemailer.createTransport({
      host: cfg.host,
      port: cfg.port,
      secure: cfg.secure,
      auth: cfg.username ? { user: cfg.username, pass: cfg.password } : undefined,
    });
    const to = cfg.recipients.split(/[,;\s]+/).map(s => s.trim()).filter(Boolean);
    if (!to.length) return;
    const subject = renderTemplate(cfg.subject || "Novo lead: {{nome}}", lead);
    const rows = [
      ["Origem", lead.source], ["Nome", lead.nome], ["Empresa", lead.empresa],
      ["WhatsApp", lead.whatsapp], ["E-mail", lead.email],
      ["Cidade", lead.cidade], ["Estado", lead.estado], ["Mensagem", lead.mensagem],
    ].filter(([, v]) => v);
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px">
        <h2 style="color:#001B3D">Novo lead recebido</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%;font-size:14px">
          ${rows.map(([k, v]) => `<tr><td style="background:#f5f5f5;font-weight:600;width:140px">${k}</td><td>${String(v).replace(/</g,"&lt;")}</td></tr>`).join("")}
        </table>
        <p style="color:#888;font-size:12px;margin-top:16px">Recebido em ${new Date(lead.createdAt).toLocaleString("pt-BR")}</p>
      </div>`;
    await transporter.sendMail({
      from: cfg.fromName ? `"${cfg.fromName}" <${cfg.fromEmail || cfg.username}>` : (cfg.fromEmail || cfg.username),
      to, subject, html,
      replyTo: lead.email || undefined,
    });
  } catch (err) {
    console.error("sendLeadEmail error:", err.message);
  }
}

// Public: create lead from site forms
app.post("/api/leads", async (req, res) => {
  try {
    const b = req.body || {};
    if (!b.nome || !b.email) return res.status(400).json({ error: "missing fields" });
    const lead = await prisma.lead.create({
      data: {
        source: String(b.source || "premiatto-zeepo").slice(0, 80),
        nome: String(b.nome).slice(0, 200),
        empresa: b.empresa ? String(b.empresa).slice(0, 200) : null,
        whatsapp: b.whatsapp ? String(b.whatsapp).slice(0, 60) : null,
        email: String(b.email).slice(0, 200),
        cidade: b.cidade ? String(b.cidade).slice(0, 120) : null,
        estado: b.estado ? String(b.estado).slice(0, 60) : null,
        mensagem: b.mensagem ? String(b.mensagem).slice(0, 2000) : null,
      },
    });
    sendLeadEmail(lead); // fire-and-forget
    res.status(201).json({ ok: true, id: lead.id });
  } catch (err) {
    console.error("create lead:", err);
    res.status(500).json({ error: "Error creating lead", message: err.message });
  }
});

app.get("/api/leads", auth, async (req, res) => {
  try {
    const { status, source } = req.query;
    const where = {};
    if (status && LEAD_STATUSES.includes(String(status))) where.status = String(status);
    if (source) where.source = String(source);
    const leads = await prisma.lead.findMany({ where, orderBy: { createdAt: "desc" }, take: 500 });
    res.json(leads);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put("/api/leads/:id", auth, async (req, res) => {
  try {
    const { status, notes } = req.body || {};
    const data = {};
    if (status && LEAD_STATUSES.includes(status)) data.status = status;
    if (typeof notes === "string") data.notes = notes;
    const lead = await prisma.lead.update({ where: { id: req.params.id }, data });
    res.json(lead);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete("/api/leads/:id", auth, async (req, res) => {
  try {
    await prisma.lead.delete({ where: { id: req.params.id } });
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ==================== SMTP CONFIG ====================
app.get("/api/smtp-config", auth, async (_req, res) => {
  try {
    const cfg = await prisma.smtpConfig.upsert({
      where: { id: 1 }, update: {}, create: { id: 1 },
    });
    res.json({ ...cfg, password: cfg.password ? "••••••••" : "" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put("/api/smtp-config", auth, async (req, res) => {
  try {
    const b = req.body || {};
    const data = {
      host: String(b.host || ""),
      port: Number(b.port) || 587,
      secure: !!b.secure,
      username: String(b.username || ""),
      fromEmail: String(b.fromEmail || ""),
      fromName: String(b.fromName || "Premiatto"),
      recipients: String(b.recipients || ""),
      subject: String(b.subject || "Novo lead: {{nome}} ({{source}})"),
      enabled: !!b.enabled,
    };
    if (b.password && b.password !== "••••••••") data.password = String(b.password);
    const cfg = await prisma.smtpConfig.upsert({
      where: { id: 1 }, update: data, create: { id: 1, ...data, password: data.password || "" },
    });
    res.json({ ok: true, updatedAt: cfg.updatedAt });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post("/api/smtp-config/test", auth, async (req, res) => {
  try {
    const to = (req.body?.to || "").trim();
    if (!to) return res.status(400).json({ error: "missing 'to' address" });
    const cfg = await prisma.smtpConfig.findUnique({ where: { id: 1 } });
    if (!cfg || !cfg.host) return res.status(400).json({ error: "SMTP não configurado" });
    const transporter = nodemailer.createTransport({
      host: cfg.host, port: cfg.port, secure: cfg.secure,
      auth: cfg.username ? { user: cfg.username, pass: cfg.password } : undefined,
    });
    await transporter.sendMail({
      from: cfg.fromName ? `"${cfg.fromName}" <${cfg.fromEmail || cfg.username}>` : (cfg.fromEmail || cfg.username),
      to, subject: "Teste SMTP - Premiatto",
      text: "Este é um e-mail de teste da configuração SMTP.",
    });
    res.json({ ok: true });
  } catch (err) {
    console.error("smtp test:", err);
    res.status(500).json({ error: err.message });
  }
});



app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Internal Server Error", message: err.message });
});

const PRIMARY_PORT = Number(process.env.PORT) || 4000;

const startServer = (port) => {
  app.listen(port, "0.0.0.0", () => {
    console.log(`API running on port ${port}`);
  });
};

startServer(PRIMARY_PORT);
