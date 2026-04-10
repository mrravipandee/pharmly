// This avoids CORS issues in both development and production
// Using relative paths that will be proxied through Next.js middleware
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

export interface RegisterPayload {
  name: string;
  whatsappNumber: string;
  address: string;
  city: string;
  discountPercent: number;
  password: string;
}

export const registerStore = async (payload: RegisterPayload) => {
  const res = await fetch(`${API_BASE}/stores/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
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
  const url = `${API_BASE}/stores/login`;
  
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(payload)
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data; // { token, store }
};

export interface DeleteAccountPayload {
  whatsappNumber: string;
  password: string;
}

export const deleteAccount = async (payload: DeleteAccountPayload) => {
  const res = await fetch(`${API_BASE}/stores/delete-account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(payload)
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to delete account");
  }

  return data;
};

