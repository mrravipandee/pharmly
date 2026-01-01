import { Router } from "express";
import storeRoutes from "./modules/store/store.routes";
import billRoutes from "./modules/bill/bill.routes";

const router = Router();

router.use("/stores", storeRoutes);
router.use("/bills", billRoutes);

export default router;
