import express, { Application } from "express";
import cors from "cors";
import routes from "./routes";

const app: Application = express();

/**
 * ✅ Allowed Origins
 */
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:4000",
  "http://localhost:5000",
  "http://127.0.0.1:3000",
  "https://pharmly.onrender.com",
  "https://pharmly.co.in",
  "https://www.pharmly.co.in",
  "https://pharmly-web.onrender.com",
  process.env.FRONTEND_URL
].filter(Boolean);

/**
 * ✅ CORS Middleware
 */
app.use(
  cors({
    origin: function (origin, callback) {
      // allow mobile apps / Postman (no origin)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ CORS Blocked:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);

/**
 * ✅ VERY IMPORTANT (Preflight)
 */
app.options("*", cors());

/**
 * ✅ Body Parser
 */
app.use(express.json());

/**
 * ✅ Routes
 */
app.use("/api", routes);

export default app;