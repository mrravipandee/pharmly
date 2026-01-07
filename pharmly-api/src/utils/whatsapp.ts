interface WhatsAppMessageInput {
  customerName: string;
  billId: string;
  storeName: string;
  storeAddress: string;
  storePhone: string;
  storeSecondaryPhone?: string;
  storeGst?: string;
}

export const generateWhatsAppMessage = (
  input: WhatsAppMessageInput
): string => {
  const billLink = `https://pharmly.co.in/bill/${input.billId}`;
  
  // Format phone number with +91 prefix
  const formattedPhone = input.storePhone.startsWith('+91') 
    ? input.storePhone 
    : `+91 ${input.storePhone}`;

  // Format secondary phone if available
  const formattedSecondaryPhone = input.storeSecondaryPhone
    ? (input.storeSecondaryPhone.startsWith('+91')
        ? input.storeSecondaryPhone
        : `+91 ${input.storeSecondaryPhone}`)
    : null;

  let message = (
    `🙏 Thank you, ${input.customerName}\n\n` +
    `Aapke recent medicine purchase ka bill niche diya gaya hai.\n\n` +
    `📄 View your bill & history:\n${billLink}\n\n` +
    `🏥 ${input.storeName}\n` +
    `📍 ${input.storeAddress}\n` +
    `📞 ${formattedPhone}`
  );

  // Add secondary phone if available
  if (formattedSecondaryPhone) {
    message += `\n📞 ${formattedSecondaryPhone}`;
  }

  // Add GST if available
  if (input.storeGst) {
    message += `\n🏢 GST: ${input.storeGst}`;
  }

  return message;
};
