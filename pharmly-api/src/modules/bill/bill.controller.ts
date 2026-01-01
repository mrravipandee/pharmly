import { Request, Response } from "express";
import { Types } from "mongoose";
import { Store } from "../store/store.model";
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
    age: number;
    sex: "male" | "female";
    whatsappNumber: string;
  };
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
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

    /** 3️⃣ Find or create customer */
    const customer = await findOrCreateCustomer({
      name: body.customer.name,
      age: body.customer.age,
      sex: body.customer.sex,
      whatsappNumber: body.customer.whatsappNumber,
      storeId
    });

    /** 4️⃣ Create bill */
    const bill = await createBill({
      storeId,
      customerId: customer._id,
      items: body.items,
      discountPercent: store.discountPercent
    });

    /** 5️⃣ Generate WhatsApp message */
    const whatsappMessage = generateWhatsAppMessage({
      customerName: customer.name,
      billId: bill._id.toString(),
      storeName: store.name,
      storeAddress: store.address,
      storePhone: store.whatsappNumber
    });

    /** 6️⃣ Final response */
    return res.status(201).json({
      success: true,
      billId: bill._id,
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
