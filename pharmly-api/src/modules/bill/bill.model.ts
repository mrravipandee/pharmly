import { Schema, model, Document, Types } from "mongoose";

interface BillItem {
  name: string;
  price: number;
  quantity: number;
  total: number;
  stripQuantity?: number; // Number of tablets/medicines in one strip
}

export interface BillDocument extends Document {
  storeId: Types.ObjectId;
  customerId: Types.ObjectId;
  items: BillItem[];
  subtotal: number;
  discountPercent: number;
  finalAmount: number;
  createdAt: Date;
}

const billSchema = new Schema<BillDocument>(
  {
    storeId: { type: Schema.Types.ObjectId, ref: "Store", required: true },
    customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
        total: Number,
        stripQuantity: Number
      }
    ],
    subtotal: Number,
    discountPercent: Number,
    finalAmount: Number
  },
  { timestamps: true }
);

/* 🔥 INDEXES */

/** For customer bill history */
billSchema.index({ customerId: 1, createdAt: -1 });

/** For store dashboards (future use) */
billSchema.index({ storeId: 1, createdAt: -1 });

export const Bill = model<BillDocument>("Bill", billSchema);
