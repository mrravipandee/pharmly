"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteAccount } from "@/api/auth.api";

export default function DeleteAccountPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    whatsappNumber: "",
    password: "",
    deleteConfirmation: ""
  });
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.whatsappNumber || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.deleteConfirmation !== "DELETE") {
      setError('Please type "DELETE" to confirm');
      return;
    }

    if (!isChecked) {
      setError("Please check the confirmation box");
      return;
    }

    try {
      setLoading(true);
      await deleteAccount({
        whatsappNumber: formData.whatsappNumber,
        password: formData.password
      });

      setSuccess(true);
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 text-center">
          <div className="text-green-600 text-5xl mb-4">✓</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Account Deleted
          </h1>
          <p className="text-gray-600 mb-4">
            Your account has been successfully deleted. Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Delete Account
        </h1>

        <p className="text-gray-600 mb-6 text-sm">
          This action is permanent. All your data including store details,
          customers, and bills will be deleted and cannot be recovered.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          
          {/* WhatsApp Number */}
          <div>
            <label className="block text-sm font-medium mb-1">
              WhatsApp Number
            </label>
            <input
              type="text"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleChange}
              placeholder="+91XXXXXXXXXX"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              disabled={loading}
            />
          </div>

          {/* Confirmation Text */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Type &quot;DELETE&quot; to confirm
            </label>
            <input
              type="text"
              name="deleteConfirmation"
              value={formData.deleteConfirmation}
              onChange={handleChange}
              placeholder="Type DELETE"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              disabled={loading}
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-start gap-2">
            <input 
              type="checkbox" 
              className="mt-1"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              disabled={loading}
            />
            <p className="text-sm text-gray-600">
              I understand that this action is irreversible.
            </p>
          </div>

          {/* Delete Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition disabled:bg-red-400 disabled:cursor-not-allowed"
          >
            {loading ? "Deleting..." : "Delete My Account"}
          </button>
        </form>
      </div>
    </div>
  );
}