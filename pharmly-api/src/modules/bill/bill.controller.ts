import { Request, Response } from "express";
import { Types } from "mongoose";
import { findOrCreateCustomer } from "../customer/customer.service";
import { createBill } from "./bill.service";
import { Store } from "../store/store.model";
import { generateWhatsAppMessage } from "../../utils/whatsapp";

interface AuthRequest extends Request {
  userId?: string;
}

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
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const storeId = new Types.ObjectId(req.userId); // from auth middleware
    const store = await Store.findById(storeId);

    if (!store) {
      return res.status(404).json({ success: false, message: "Store not found" });
    }

    const { customer, items } = req.body as CreateBillRequestBody;

    const customerDoc = await findOrCreateCustomer({
      ...customer,
      storeId
    });

    const bill = await createBill({
      storeId,
      customerId: customerDoc._id,
      items,
      discountPercent: store.discountPercent
    });

    const whatsappMessage = generateWhatsAppMessage({
      customerName: customerDoc.name,
      billId: bill._id.toString(),
      storeName: store.name,
      storeAddress: store.address,
      storePhone: store.whatsappNumber
    });

    return res.status(201).json({
      success: true,
      billId: bill._id,
      whatsappMessage
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ success: false, message: error.message });
    }
    return res.status(500).json({ success: false });
  }
};
