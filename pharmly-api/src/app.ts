import express, { Application } from "express";
import cors from "cors";
import routes from "./routes";

const app: Application = express();

// 🔥 Preflight hard-fix
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://pharmly.co.in"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());
app.use("/api", routes);

export default app;
