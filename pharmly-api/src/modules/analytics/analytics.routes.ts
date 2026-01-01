import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import {
  getTodaySummary,
  getSalesHistory,
  getOwnerRecentBills
} from "./analytics.controller";

const router = Router();

router.get("/today", requireAuth, getTodaySummary);
router.get("/history", requireAuth, getSalesHistory);
router.get("/recent-bills", requireAuth, getOwnerRecentBills);

export default router;
