import { Router } from "express";
import { createBillHandler } from "./bill.controller";
import { requireAuth } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", requireAuth, createBillHandler);

export default router;
