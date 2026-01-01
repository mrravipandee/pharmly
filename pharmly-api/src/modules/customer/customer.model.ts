import { Schema, model, Document, Types } from "mongoose";

export interface CustomerDocument extends Document {
  name: string;
  age: number;
  sex: "male" | "female";
  whatsappNumber: string;
  storeId: Types.ObjectId;
}

const customerSchema = new Schema<CustomerDocument>(
  {
    name: String,
    age: Number,
    sex: { type: String, enum: ["male", "female"], required: true },
    whatsappNumber: { type: String, required: true },
    storeId: { type: Schema.Types.ObjectId, ref: "Store", required: true }
  },
  { timestamps: true }
);

/* 🔥 INDEXES */

/** One customer per store per number */
customerSchema.index(
  { whatsappNumber: 1, storeId: 1 },
  { unique: true }
);

export const Customer = model<CustomerDocument>(
  "Customer",
  customerSchema
);
