// This avoids CORS issues in both development and production
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

console.log("API_BASE:", API_BASE); // Debug: Check which URL is being used

export interface RegisterPayload {
  name: string;
  whatsappNumber: string;
  address: string;
  city: string;
  discountPercent: number;
  password: string;
}

export const registerStore = async (payload: RegisterPayload) => {
  const res = await fetch(`${API_BASE}/api/stores/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data; // usually { token, store }
};

export interface LoginPayload {
  whatsappNumber: string;
  password: string;
}

export const loginStore = async (payload: LoginPayload) => {
  const url = `${API_BASE}/api/stores/login`;
  console.log("Login URL:", url);
  console.log("Payload:", payload);
  
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  console.log("Response:", res.status, data);

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data; // { token, store }
};

