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

  const store = await Store.create(data);

  return store;
};

export const validatePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
