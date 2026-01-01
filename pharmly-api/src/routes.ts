import { Router } from "express";
import storeRoutes from "./modules/store/store.routes";
import billRoutes from "./modules/bill/bill.routes";
import analyticsRoutes from "./modules/analytics/analytics.routes";

const router = Router();

router.use("/stores", storeRoutes);
router.use("/bills", billRoutes);
router.use("/analytics", analyticsRoutes);

export default router;
