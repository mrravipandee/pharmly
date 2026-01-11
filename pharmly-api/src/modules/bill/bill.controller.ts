import { Request, Response } from "express";
import { Types } from "mongoose";
import { Store } from "../store/store.model";
import { Bill } from "./bill.model";
import { findOrCreateCustomer } from "../customer/customer.service";
import { createBill } from "./bill.service";
import { generateWhatsAppMessage } from "../../utils/whatsapp";
import { getBillById, getPreviousBills } from "./bill.service";

/**
 * Expected req.userId → set by auth middleware
 */
interface CreateBillRequestBody {
  customer: {
    name: string;
    age?: number | string;
    sex?: "male" | "female";
    gender?: string; // Frontend sends 'gender' instead of 'sex'
    whatsappNumber: string;
  };
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
  discountPercent?: number;
  subtotal?: number;
  discountAmount?: number;
  totalAmount?: number;
}

export const createBillHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    /** 1️⃣ Validate store */
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const storeId = new Types.ObjectId(req.userId);
    const store = await Store.findById(storeId);

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found"
      });
    }

    /** 2️⃣ Validate request body */
    const body = req.body as CreateBillRequestBody;

    if (
      !body.customer ||
      !body.customer.whatsappNumber ||
      !Array.isArray(body.items) ||
      body.items.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid bill data"
      });
    }

    /** 3️⃣ Map gender to sex and handle optional fields */
    const customerAge = body.customer.age 
      ? (typeof body.customer.age === 'string' ? parseInt(body.customer.age) : body.customer.age)
      : 0;
    
    const customerSex = body.customer.sex || 
                        (body.customer.gender === "male" || body.customer.gender === "female" 
                          ? body.customer.gender 
                          : "male");

    /** 4️⃣ Find or create customer */
    const customer = await findOrCreateCustomer({
      name: body.customer.name || "Customer",
      age: customerAge,
      sex: customerSex,
      whatsappNumber: body.customer.whatsappNumber,
      storeId
    });

    /** 5️⃣ Use discount from request or store default */
    const discountPercent = body.discountPercent !== undefined 
      ? body.discountPercent 
      : store.discountPercent;

    /** 6️⃣ Create bill */
    const bill = await createBill({
      storeId,
      customerId: customer._id,
      items: body.items,
      discountPercent
    });

    /** 7️⃣ Generate WhatsApp message */
    const whatsappMessage = generateWhatsAppMessage({
      customerName: customer.name || "Customer",
      billId: bill._id.toString(),
      storeName: store.name,
      storeAddress: store.address,
      storePhone: store.whatsappNumber,
      storeSecondaryPhone: store.secondaryMobileNumber,
      storeGst: store.gstNumber
    });

    /** 8️⃣ Final response */
    return res.status(201).json({
      success: true,
      billId: bill._id.toString(),
      customer: {
        name: customer.name,
        whatsappNumber: customer.whatsappNumber
      },
      totalAmount: bill.finalAmount,
      whatsappMessage
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export const getAllBillsHandler = async (
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
    
    // Get all bills for this store, populate customer details, sort by most recent first
    const bills = await Bill.find({ storeId })
      .populate("customerId", "name whatsappNumber")
      .sort({ createdAt: -1 })
      .lean();

    return res.json({
      success: true,
      bills
    });
  } catch (error) {
    console.error("Error fetching bills:", error);
    return res.status(500).json({ 
      success: false,
      message: "Failed to fetch bills"
    });
  }
};

export const getPublicBillHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const billId = req.params.id;

    const bill = await getBillById(billId);
    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found"
      });
    }

    const previousBills = await getPreviousBills(
      bill.customerId as Types.ObjectId,
      bill._id
    );

    return res.json({
      success: true,
      data: {
        store: bill.storeId,
        customer: bill.customerId,
        currentBill: {
          id: bill._id,
          items: bill.items,
          subtotal: bill.subtotal,
          discountPercent: bill.discountPercent,
          finalAmount: bill.finalAmount,
          date: bill.createdAt
        },
        previousBills
      }
    });
  } catch {
    return res.status(500).json({ success: false });
  }
};

/**
 * Update a bill
 * PUT /api/bills/:id
 * Only the store that created the bill can update it
 */
export const updateBillHandler = async (
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
    const storeId = new Types.ObjectId(req.userId);

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid bill ID"
      });
    }

    // Find the bill
    const bill = await Bill.findById(id);

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found"
      });
    }

    // Check if the store owns this bill
    if (bill.storeId.toString() !== storeId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to edit this bill"
      });
    }

    // Update bill data
    const { items, discountPercent } = req.body;

    if (items && Array.isArray(items)) {
      // Recalculate totals
      let subtotal = 0;
      const updatedItems = items.map((item: any) => {
        const total = item.price * item.quantity;
        subtotal += total;
        return {
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          total,
          stripQuantity: item.stripQuantity
        };
      });

      bill.items = updatedItems;
      bill.subtotal = subtotal;
    }

    if (discountPercent !== undefined) {
      bill.discountPercent = discountPercent;
    }

    // Recalculate final amount
    bill.finalAmount = bill.subtotal - (bill.subtotal * bill.discountPercent / 100);

    await bill.save();

    return res.json({
      success: true,
      bill,
      message: "Bill updated successfully"
    });
  } catch (error: unknown) {
    console.error("Error updating bill:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update bill"
    });
  }
};

/**
 * Delete a bill
 * DELETE /api/bills/:id
 * Only the store that created the bill can delete it
 */
export const deleteBillHandler = async (
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
    const storeId = new Types.ObjectId(req.userId);

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid bill ID"
      });
    }

    // Find the bill
    const bill = await Bill.findById(id);

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found"
      });
    }

    // Check if the store owns this bill
    if (bill.storeId.toString() !== storeId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to delete this bill"
      });
    }

    await Bill.findByIdAndDelete(id);

    return res.json({
      success: true,
      message: "Bill deleted successfully"
    });
  } catch (error: unknown) {
    console.error("Error deleting bill:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete bill"
    });
  }
};
