export interface Store {
  name: string;
  address: string;
  whatsappNumber: string;
}

export interface Customer {
  name: string;
  whatsappNumber: string;
}

export interface BillItem {
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export interface CurrentBill {
  id: string;
  items: BillItem[];
  subtotal: number;
  discountPercent: number;
  finalAmount: number;
  date: string;
}

export interface PreviousBill {
  finalAmount: number;
  createdAt: string;
}

export interface PublicBillResponse {
  store: Store;
  customer: Customer;
  currentBill: CurrentBill;
  previousBills: PreviousBill[];
}
