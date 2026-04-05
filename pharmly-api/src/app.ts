import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import routes from "./routes";

const app: Application = express();

/**
 * ✅ CORS — FIXED (PRODUCTION READY)
 */
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:4000",
  "https://pharmly.co.in",
  "https://www.pharmly.co.in",
  "https://pharmly-web.onrender.com",
  process.env.FRONTEND_URL
].filter((origin): origin is string => Boolean(origin));


const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    console.log("Incoming Origin:", origin);

    // ✅ Allow requests without origin (Postman etc.)
    if (!origin) return callback(null, true);

    // ✅ Allow localhost (your current frontend)
    if (origin.startsWith("http://localhost")) {
      return callback(null, true);
    }

    // ✅ Allow production domains
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log("❌ Blocked by CORS:", origin);

    // 🔥 IMPORTANT FIX (do NOT throw error)
    return callback(null, false);
  },
  credentials: true,
};

// 🔥 VERY IMPORTANT
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api", routes);

export default app;