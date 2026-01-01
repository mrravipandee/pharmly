interface WhatsAppMessageInput {
  customerName: string;
  billId: string;
  storeName: string;
  storeAddress: string;
  storePhone: string;
}

export const generateWhatsAppMessage = (
  input: WhatsAppMessageInput
): string => {
  const billLink = `https://pharmly.co.in/bill/${input.billId}`;

  return (
    `🙏 Thank you, ${input.customerName}\n\n` +
    `Aapke recent medicine purchase ka bill niche diya gaya hai.\n\n` +
    `📄 View your bill & history:\n${billLink}\n\n` +
    `🏥 ${input.storeName}\n` +
    `📍 ${input.storeAddress}\n` +
    `📞 ${input.storePhone}`
  );
};
