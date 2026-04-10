import express, { Application } from "express";
import cors from "cors";
import routes from "./routes";

const app: Application = express();

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

const corsOptions = {
  origin: (origin: string | undefined, callback: Function) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log("❌ CORS Blocked:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
};

app.use(cors(corsOptions));

// Preflight (important for browser)
app.options(/.*/, cors(corsOptions));

app.use(express.json());

app.use("/api", routes);

export default app;