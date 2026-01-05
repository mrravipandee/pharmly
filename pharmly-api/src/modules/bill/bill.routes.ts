import { Router } from "express";
import { createBillHandler, getAllBillsHandler, getPublicBillHandler } from "./bill.controller";
import { requireAuth } from "../../middlewares/auth.middleware";

const router = Router();

/** medical (protected) */
router.post("/", requireAuth, createBillHandler);
router.get("/", requireAuth, getAllBillsHandler);

/** public (patient) */
router.get("/public/:id", getPublicBillHandler);

export default router;
