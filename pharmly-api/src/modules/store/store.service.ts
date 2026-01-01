import bcrypt from "bcryptjs";
import { Store, StoreDocument } from "./store.model";

interface CreateStoreInput {
  name: string;
  whatsappNumber: string;
  address: string;
  city: string;
  discountPercent: number;
  password: string;
}

export const createStore = async (
  data: CreateStoreInput
): Promise<StoreDocument> => {
  const existingStore = await Store.findOne({
    whatsappNumber: data.whatsappNumber
  });

  if (existingStore) {
    throw new Error("Store already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const store = await Store.create({
    ...data,
    password: hashedPassword
  });

  return store;
};

export const validatePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
