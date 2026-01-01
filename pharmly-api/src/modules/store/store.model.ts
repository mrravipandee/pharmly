import { Schema, model, Document } from "mongoose";

export interface StoreDocument extends Document {
  name: string;
  whatsappNumber: string;
  address: string;
  city: string;
  discountPercent: number;
  password: string;
  createdAt: Date;
}

const storeSchema = new Schema<StoreDocument>(
  {
    name: { type: String, required: true },
    whatsappNumber: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    discountPercent: { type: Number, default: 0 },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

export const Store = model<StoreDocument>("Store", storeSchema);
