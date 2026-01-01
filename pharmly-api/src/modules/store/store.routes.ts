import { Router } from "express";
import { registerStore, loginStore } from "./store.controller";

const router = Router();

router.post("/register", registerStore);
router.post("/login", loginStore);

export default router;
