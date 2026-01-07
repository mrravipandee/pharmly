"use client";

import { useState, useEffect } from "react";
import { Store, Phone, MapPin, Percent, Save, ArrowLeft, Loader2, CreditCard } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const [storeName, setStoreName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [secondaryMobileNumber, setSecondaryMobileNumber] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [discount, setDiscount] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStoreDetails();
  }, []);

  const fetchStoreDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to view settings");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/stores/details", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (data.success && data.store) {
        setStoreName(data.store.name || "");
        setWhatsappNumber(data.store.whatsappNumber || "");
        setSecondaryMobileNumber(data.store.secondaryMobileNumber || "");
        setGstNumber(data.store.gstNumber || "");
        setAddress(data.store.address || "");
        setCity(data.store.city || "");
        setDiscount(data.store.discountPercent?.toString() || "");
        
        // Update localStorage too
        localStorage.setItem("storeName", data.store.name || "");
        localStorage.setItem("storeWhatsapp", data.store.whatsappNumber || "");
        localStorage.setItem("storeSecondaryMobile", data.store.secondaryMobileNumber || "");
        localStorage.setItem("storeGst", data.store.gstNumber || "");
        localStorage.setItem("storeAddress", data.store.address || "");
        localStorage.setItem("storeCity", data.store.city || "");
        localStorage.setItem("storeDiscount", data.store.discountPercent?.toString() || "");
      } else {
        setError(data.message || "Failed to load store details");
      }
    } catch (err) {
      setError("Failed to load store details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to save changes");
        return;
      }

      const res = await fetch("/api/stores/details", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: storeName,
          whatsappNumber,
          secondaryMobileNumber,
          gstNumber,
          address,
          city,
          discountPercent: parseFloat(discount) || 0
        })
      });

      const data = await res.json();

      if (data.success && data.store) {
        // Update localStorage
        localStorage.setItem("storeName", data.store.name || "");
        localStorage.setItem("storeWhatsapp", data.store.whatsappNumber || "");
        localStorage.setItem("storeSecondaryMobile", data.store.secondaryMobileNumber || "");
        localStorage.setItem("storeGst", data.store.gstNumber || "");
        localStorage.setItem("storeAddress", data.store.address || "");
        localStorage.setItem("storeCity", data.store.city || "");
        localStorage.setItem("storeDiscount", data.store.discountPercent?.toString() || "");
        
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        setError(data.message || "Failed to save changes");
      }
    } catch (err) {
      setError("Failed to save changes");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-teal-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Store Settings</h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Manage your store information and preferences
          </p>
        </div>

        {/* Settings Form */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
          <div className="space-y-6">
            {/* Store Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Store className="w-4 h-4" />
                Store Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter store name"
              />
            </div>

            {/* WhatsApp Number */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4" />
                WhatsApp Number
              </label>
              <input
                type="tel"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="9876543210"
              />
            </div>

            {/* Secondary Mobile Number */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4" />
                Secondary Mobile Number <span className="text-xs text-gray-500 font-normal">(Optional)</span>
              </label>
              <input
                type="tel"
                value={secondaryMobileNumber}
                onChange={(e) => setSecondaryMobileNumber(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="9876543210"
              />
            </div>

            {/* GST Number */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <CreditCard className="w-4 h-4" />
                GST Number <span className="text-xs text-gray-500 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="22AAAAA0000A1Z5"
                maxLength={15}
              />
            </div>

            {/* Address */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4" />
                Address
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter store address"
              />
            </div>

            {/* City */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4" />
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter city"
              />
            </div>

            {/* Default Discount */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Percent className="w-4 h-4" />
                Default Discount (%)
              </label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="0"
                min="0"
                max="100"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex flex-col md:flex-row items-start md:items-center gap-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
            {saved && (
              <span className="text-sm text-green-600 font-medium">
                ✓ Settings saved successfully!
              </span>
            )}
            {error && (
              <span className="text-sm text-red-600 font-medium">
                {error}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
