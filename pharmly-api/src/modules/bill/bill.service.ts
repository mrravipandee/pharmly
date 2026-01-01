import { Bill, BillDocument } from "./bill.model";
import { Types } from "mongoose";

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
    ...item,
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
