import { Request, Response } from "express";
import { Customer } from "./customer.model";
import { Bill } from "../bill/bill.model";
import { Types } from "mongoose";

/**
 * Get all customers who have bills from this store
 * GET /api/patients
 */
export const getStoreCustomers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const storeId = new Types.ObjectId(req.userId);

    // Get all bills for this store and extract unique customer IDs
    const bills = await Bill.find({ storeId }).distinct("customerId");

    // Get customer details for those who have bills
    const customers = await Customer.find({
      _id: { $in: bills }
    })
      .sort({ createdAt: -1 })
      .lean();

    // Format response
    const formattedCustomers = customers.map(customer => ({
      id: customer._id,
      name: customer.name,
      age: customer.age,
      gender: customer.sex,
      whatsappNumber: customer.whatsappNumber
    }));

    return res.json({
      success: true,
      customers: formattedCustomers,
      total: formattedCustomers.length
    });
  } catch (error: unknown) {
    console.error("Error fetching customers:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch customers"
    });
  }
};

/**
 * Search for a customer by WhatsApp number
 * GET /api/patients/search?whatsappNumber=xxx
 */
export const searchCustomer = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const { whatsappNumber } = req.query;

    if (!whatsappNumber || typeof whatsappNumber !== "string") {
      return res.status(400).json({
        success: false,
        message: "WhatsApp number is required"
      });
    }

    const storeId = new Types.ObjectId(req.userId);
    
    const customer = await Customer.findOne({
      whatsappNumber,
      storeId
    });

    if (!customer) {
      return res.json({
        exists: false
      });
    }

    return res.json({
      exists: true,
      patient: {
        name: customer.name,
        age: customer.age,
        gender: customer.sex, // Map 'sex' to 'gender' for frontend
        whatsappNumber: customer.whatsappNumber
      }
    });
  } catch (error: unknown) {
    console.error("Error searching customer:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to search customer"
    });
  }
};

/**
 * Create a new customer
 * POST /api/patients
 */
export const createCustomer = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const { name, age, gender, whatsappNumber } = req.body;

    if (!whatsappNumber) {
      return res.status(400).json({
        success: false,
        message: "WhatsApp number is required"
      });
    }

    const storeId = new Types.ObjectId(req.userId);

    // Check if customer already exists
    const existingCustomer = await Customer.findOne({
      whatsappNumber,
      storeId
    });

    if (existingCustomer) {
      return res.json({
        success: true,
        patient: {
          name: existingCustomer.name,
          age: existingCustomer.age,
          gender: existingCustomer.sex,
          whatsappNumber: existingCustomer.whatsappNumber
        }
      });
    }

    // Map 'gender' from frontend to 'sex' for backend
    const sex: "male" | "female" | "other" = 
      gender === "male" || gender === "female" || gender === "other" 
        ? gender 
        : "male";

    const customer = await Customer.create({
      name: name || "Customer",
      age: age ? parseInt(age.toString()) : undefined,
      sex,
      whatsappNumber,
      storeId
    });

    return res.status(201).json({
      success: true,
      patient: {
        name: customer.name,
        age: customer.age,
        gender: customer.sex,
        whatsappNumber: customer.whatsappNumber
      }
    });
  } catch (error: unknown) {
    console.error("Error creating customer:", error);
    if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    return res.status(500).json({
      success: false,
      message: "Failed to create customer"
    });
  }
};
