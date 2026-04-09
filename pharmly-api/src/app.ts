import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import routes from "./routes";

const app: Application = express();

/**
 * ✅ Allowed Origins
 */
const allowedOrigins = [
  "http://localhost:5000",
  "http://localhost:4000",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:4000",
  "https://pharmly.co.in",
  "https://www.pharmly.co.in",
  "https://pharmly-web.onrender.com",
  process.env.FRONTEND_URL
].filter((origin): origin is string => Boolean(origin));

/**
 * ✅ CORS Options
 */
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (
      allowedOrigins.includes(origin) ||
      origin.startsWith("http://localhost:") ||
      origin.startsWith("http://127.0.0.1:")
    ) {
      return callback(null, true);
    }

    console.warn("❌ Blocked by CORS:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["Authorization"],
  optionsSuccessStatus: 200
};

/**
 * ✅ FINAL ORDER (IMPORTANT)
 */

// 1️⃣ CORS
app.use(cors(corsOptions));

// 2️⃣ Preflight handler (MAIN FIX)
app.use(cors(corsOptions));

// 3️⃣ Body parser
app.use(express.json());

// 4️⃣ Routes
app.use("/api", routes);

export default app;