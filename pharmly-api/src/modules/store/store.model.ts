import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface StoreDocument extends Document {
  name: string;
  whatsappNumber: string;
  secondaryMobileNumber?: string;
  gstNumber?: string;
  address: string;
  city: string;
  discountPercent: number;
  password: string;
}

const storeSchema = new Schema<StoreDocument>(
  {
    name: { type: String, required: true },
    whatsappNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    secondaryMobileNumber: {
      type: String,
      required: false,
      trim: true
    },
    gstNumber: {
      type: String,
      required: false,
      trim: true,
      uppercase: true
    },
    address: { type: String, required: true },
    city: { type: String, required: true },
    discountPercent: { type: Number, default: 0 },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

/* 🔐 Password hashing */
storeSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export const Store = model<StoreDocument>("Store", storeSchema);
