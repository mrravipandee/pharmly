import { Bill, BillDocument } from "./bill.model";
import { Types } from "mongoose";

/* ---------------- READ ---------------- */

export const getBillById = async (
  billId: string
): Promise<BillDocument | null> => {
  if (!Types.ObjectId.isValid(billId)) {
    return null;
  }

  return Bill.findById(billId)
    .populate("storeId", "name address whatsappNumber")
    .populate("customerId", "name whatsappNumber")
    .exec();
};

export const getPreviousBills = async (
  customerId: Types.ObjectId,
  currentBillId: Types.ObjectId
): Promise<BillDocument[]> => {
  return Bill.find({
    customerId,
    _id: { $ne: currentBillId }
  })
    .sort({ createdAt: -1 })
    .limit(10)
    .select("finalAmount createdAt")
    .exec();
};

/* ---------------- WRITE ---------------- */

interface BillItemInput {
  name: string;
  price: number;
  quantity: number;
}

interface CreateBillInput {
  storeId: Types.ObjectId;
  customerId: Types.ObjectId;
  items: BillItemInput[];
  discountPercent: number;
}

export const createBill = async (
  input: CreateBillInput
): Promise<BillDocument> => {
  const itemsWithTotal = input.items.map((item) => ({
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    total: item.price * item.quantity
  }));

  const subtotal = itemsWithTotal.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const discountAmount = (subtotal * input.discountPercent) / 100;
  const finalAmount = subtotal - discountAmount;

  const bill = await Bill.create({
    storeId: input.storeId,
    customerId: input.customerId,
    items: itemsWithTotal,
    subtotal,
    discountPercent: input.discountPercent,
    finalAmount
  });

  return bill;
};
