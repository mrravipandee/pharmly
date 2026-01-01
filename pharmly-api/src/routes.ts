import { Router } from "express";
import storeRoutes from "./modules/store/store.routes";

const router = Router();

router.use("/stores", storeRoutes);

export default router;
