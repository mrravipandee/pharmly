import express, { Application } from "express";
import cors from "cors";
import routes from "./routes";

const app: Application = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://pharmly.co.in"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// VERY IMPORTANT — preflight handler
app.options("*", cors());

app.use(express.json());
app.use("/api", routes);

export default app;
