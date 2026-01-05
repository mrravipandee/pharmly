import { Router } from "express";
import { searchCustomer, createCustomer, getStoreCustomers } from "./customer.controller";
import { requireAuth } from "../../middlewares/auth.middleware";

const router = Router();

// Get all customers for this store (who have bills)
router.get("/", requireAuth, getStoreCustomers);

// Search customer by WhatsApp number
router.get("/search", requireAuth, searchCustomer);

// Create new customer
router.post("/", requireAuth, createCustomer);

export default router;
