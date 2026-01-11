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

    // Search globally - any store can find any customer
    const customer = await Customer.findOne({
      whatsappNumber
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
 * Update customer information
 * PUT /api/patients/:id
 * Only the store that created the customer can update
 */
export const updateCustomer = async (
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

    const { id } = req.params;
    const { name, age, gender, whatsappNumber } = req.body;
    const storeId = new Types.ObjectId(req.userId);

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid customer ID"
      });
    }

    // Find the customer
    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found"
      });
    }

    // Check if the store owns this customer (only the store that created can edit)
    if (!customer.storeId || customer.storeId.toString() !== storeId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to edit this customer"
      });
    }

    // Validate whatsapp number if being changed
    if (whatsappNumber && whatsappNumber !== customer.whatsappNumber) {
      const existingCustomer = await Customer.findOne({
        whatsappNumber,
        _id: { $ne: id }
      });

      if (existingCustomer) {
        return res.status(400).json({
          success: false,
          message: "WhatsApp number already exists"
        });
      }
    }

    // Update fields
    if (name !== undefined) customer.name = name;
    if (age !== undefined) customer.age = age ? parseInt(age.toString()) : undefined;
    if (gender !== undefined && (gender === "male" || gender === "female" || gender === "other")) {
      customer.sex = gender;
    }
    if (whatsappNumber !== undefined) customer.whatsappNumber = whatsappNumber;

    await customer.save();

    return res.json({
      success: true,
      customer: {
        id: customer._id,
        name: customer.name,
        age: customer.age,
        gender: customer.sex,
        whatsappNumber: customer.whatsappNumber
      },
      message: "Customer updated successfully"
    });
  } catch (error: unknown) {
    console.error("Error updating customer:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update customer"
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

    // Check if customer already exists (globally - any store can see any customer)
    const existingCustomer = await Customer.findOne({
      whatsappNumber
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

    // Create new customer with storeId (tracks which store created them)
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
