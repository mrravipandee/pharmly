import { Schema, model, Document } from "mongoose";

export interface CustomerDocument extends Document {
  name?: string;
  age?: number;
  sex?: "male" | "female" | "other";
  whatsappNumber: string;
}

const customerSchema = new Schema<CustomerDocument>(
  {
    name: { type: String, required: false },
    age: { type: Number, required: false },
    sex: {
      type: String,
      enum: ["male", "female", "other"],
      required: false
    },
    whatsappNumber: {
      type: String,
      required: true,
      unique: true,   // 🔑 VERY IMPORTANT
      index: true
    }
  },
  { timestamps: true }
);

export const Customer = model<CustomerDocument>(
  "Customer",
  customerSchema
);
