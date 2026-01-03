const API_BASE = "https://api.pharmly.co.in";

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
  const res = await fetch(`${API_BASE}/api/stores/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data; // { token, store }
};

