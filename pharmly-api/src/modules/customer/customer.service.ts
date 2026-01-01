import { Customer, CustomerDocument } from "./customer.model";
import { Types } from "mongoose";

interface CreateCustomerInput {
  name: string;
  age: number;
  sex: "male" | "female";
  whatsappNumber: string;
  storeId: Types.ObjectId;
}

export const findOrCreateCustomer = async (
  input: CreateCustomerInput
): Promise<CustomerDocument> => {
  const existingCustomer = await Customer.findOne({
    whatsappNumber: input.whatsappNumber,
    storeId: input.storeId
  });

  if (existingCustomer) {
    return existingCustomer;
  }

  const customer = await Customer.create(input);
  return customer;
};
