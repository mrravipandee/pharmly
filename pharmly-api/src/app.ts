import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import routes from "./routes";

const app: Application = express();

/**
 * ✅ CORS — PRODUCTION READY
 */
const allowedOrigins = [
  // Development
  "http://localhost:3000",
  "http://localhost:4000",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:4000",
  // Production
  "https://pharmly.co.in",
  "https://www.pharmly.co.in",
  "https://pharmly-web.onrender.com",
  "https://pharmly-api.onrender.com",
  // Environment variable
  process.env.FRONTEND_URL
].filter((origin): origin is string => Boolean(origin) && origin !== "undefined");

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests without origin (server-to-server, Postman, mobile apps)
    if (!origin) return callback(null, true);

    // Allow if origin is in whitelist
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Allow localhost variations
    if (origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:")) {
      return callback(null, true);
    }

    console.warn(`❌ CORS blocked origin: ${origin}`);
    return callback(new Error("CORS not allowed"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
  maxAge: 86400 // 24 hours
};

// 🔥 VERY IMPORTANT
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api", routes);

export default app;