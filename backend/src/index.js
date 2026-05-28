import "dotenv/config";
import express      from "express";
import cors         from "cors";
import rateLimit    from "express-rate-limit";
import contactRoute from "./routes/contact.js";

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
  methods: ["GET", "POST"],
}));

app.use(express.json({ limit: "10kb" }));

// Global rate-limit: max 60 requests / 15 min per IP
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
}));

// ── Routes ─────────────────────────────────────────────────
app.use("/api/contact", contactRoute);

// Health check
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// 404 fallback
app.use((_req, res) => res.status(404).json({ error: "Not found" }));

// ── Start ──────────────────────────────────────────────────
app.listen(PORT, () =>
  console.log(`✓ Backend running on http://localhost:${PORT}`)
);
