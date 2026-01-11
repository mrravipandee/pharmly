import { Router } from "express";
import { createBillHandler, getAllBillsHandler, getPublicBillHandler, updateBillHandler, deleteBillHandler } from "./bill.controller";
import { requireAuth } from "../../middlewares/auth.middleware";

const router = Router();

/** medical (protected) */
router.post("/", requireAuth, createBillHandler);
router.get("/", requireAuth, getAllBillsHandler);
router.put("/:id", requireAuth, updateBillHandler);
router.delete("/:id", requireAuth, deleteBillHandler);

/** public (patient) */
router.get("/public/:id", getPublicBillHandler);

export default router;
