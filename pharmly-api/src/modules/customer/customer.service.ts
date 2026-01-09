import { Customer, CustomerDocument } from "./customer.model";
import { Types } from "mongoose";

interface CreateCustomerInput {
  name: string;
  age?: number;
  sex?: "male" | "female" | "other";
  whatsappNumber: string;
  storeId: Types.ObjectId;
}

export const findOrCreateCustomer = async (
  input: CreateCustomerInput
): Promise<CustomerDocument> => {
  // Search globally by whatsappNumber only (customers are shared across stores)
  const existingCustomer = await Customer.findOne({
    whatsappNumber: input.whatsappNumber
  });

  if (existingCustomer) {
    return existingCustomer;
  }

  // Create new customer with storeId (tracks which store created them)
  const customer = await Customer.create(input);
  return customer;
};
