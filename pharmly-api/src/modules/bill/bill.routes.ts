import { Router } from "express";
import { createBillHandler } from "./bill.controller";
import { getPublicBillHandler } from "./bill.controller";
import { requireAuth } from "../../middlewares/auth.middleware";

const router = Router();

/** medical (protected) */
router.post("/", requireAuth, createBillHandler);

/** public (patient) */
router.get("/public/:id", getPublicBillHandler);

export default router;
