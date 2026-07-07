import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ── Security Middlewares ──────────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Business-Id"],
  })
);

// ── Request Parsing ───────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Logging ───────────────────────────────────────────────────────────
app.use(morgan("dev"));

// ── Health Check ──────────────────────────────────────────────────────
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// ── API Root ──────────────────────────────────────────────────────────
app.get("/api", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Aedrea AI Receptionist SaaS API API is online",
    version: "1.0.0",
  });
});

// ── Error Handling Middleware ─────────────────────────────────────────
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandle Error Caught: ", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
});

export default app;
