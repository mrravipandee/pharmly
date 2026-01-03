import express, { Application } from "express";
import cors from "cors";
import routes from "./routes";

const app: Application = express();

// CORS configuration - MUST come before other middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://localhost:3000",
      "https://pharmly.co.in",
      "https://www.pharmly.co.in"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true, // Important for auth cookies/tokens
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
    maxAge: 86400 // Cache preflight for 24 hours
  })
);

// Handle preflight requests explicitly
app.options("*", cors());

app.use(express.json());
app.use("/api", routes);

export default app;
