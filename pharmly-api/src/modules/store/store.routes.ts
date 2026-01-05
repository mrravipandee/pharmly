import { Router } from "express";
import { registerStore, loginStore, getStoreDetails, updateStoreDetails } from "./store.controller";
import { requireAuth } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/register", registerStore);
router.post("/login", loginStore);
router.get("/details", requireAuth, getStoreDetails);
router.put("/details", requireAuth, updateStoreDetails);

export default router;
