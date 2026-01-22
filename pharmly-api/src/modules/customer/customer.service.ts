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
  // Normalize phone number - remove spaces, dashes, and country code
  const normalizedNumber = input.whatsappNumber.replace(/[\s\-\+]/g, '').replace(/^91/, '');
  
  console.log(`🔍 findOrCreateCustomer - Looking for: ${input.whatsappNumber} (normalized: ${normalizedNumber})`);
  
  // Search globally by whatsappNumber with multiple formats
  const existingCustomer = await Customer.findOne({
    $or: [
      { whatsappNumber: input.whatsappNumber },
      { whatsappNumber: normalizedNumber },
      { whatsappNumber: `+91${normalizedNumber}` },
      { whatsappNumber: `91${normalizedNumber}` }
    ]
  });

  if (existingCustomer) {
    console.log(`✅ Found existing customer: ${existingCustomer.name} (${existingCustomer.whatsappNumber})`);
    return existingCustomer;
  }

  console.log(`➕ Creating new customer with number: ${normalizedNumber}`);
  
  // Create new customer with normalized number (store without country code)
  const customer = await Customer.create({
    ...input,
    whatsappNumber: normalizedNumber
  });
  
  return customer;
};
