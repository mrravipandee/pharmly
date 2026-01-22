"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  FileText, 
  Calendar,
  User, 
  Loader2, 
  AlertCircle,
  ArrowRight,
  Edit2,
  Trash2,
  X,
  Share2
} from "lucide-react";

interface Bill {
  _id: string;
  customerId: {
    name: string;
    whatsappNumber: string;
  };
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  discountPercent: number;
  finalAmount: number;
  createdAt: string;
}

export default function BillsPage() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingBillId, setDeletingBillId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        setError("Please login to view bills");
        return;
      }

      const res = await fetch("/api/bills", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (data.success) {
        setBills(data.bills || []);
      } else {
        setError(data.message || "Failed to fetch bills");
      }
    } catch (err) {
      setError("Failed to load bills");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", { 
      day: "numeric", 
      month: "short", 
      year: "numeric" 
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-IN", { 
      hour: "2-digit", 
      minute: "2-digit" 
    });
  };

  const handleDeleteBill = async (billId: string) => {
    try {
      setDeleting(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        setError("Please login to delete bills");
        return;
      }

      const res = await fetch(`/api/bills/${billId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (data.success) {
        // Remove bill from state
        setBills(bills.filter(b => b._id !== billId));
        setDeletingBillId(null);
      } else {
        setError(data.message || "Failed to delete bill");
      }
    } catch (err) {
      setError("Failed to delete bill");
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const handleShareBill = (bill: Bill) => {
    const phoneNumber = bill.customerId?.whatsappNumber || "";
    if (phoneNumber) {
      const billUrl = `${window.location.origin}/bill/${bill._id}`;
      const customerName = bill.customerId?.name || "Customer";
      const amount = bill.finalAmount.toFixed(2);
      
      const message = `Hello ${customerName}! 👋\n\nYour bill is ready!\n\n💊 Total Amount: ₹${amount}\n📄 View your bill: ${billUrl}\n\nThank you for your purchase! 🙏`;
      
      const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-teal-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading bills...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md w-full">
          <AlertCircle className="w-6 h-6 text-red-600 mx-auto mb-3" />
          <p className="text-red-600 text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-teal-500 to-teal-700 rounded-lg shadow-md">
                  <FileText className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">All Bills</h1>
              </div>
              <p className="text-sm md:text-base text-gray-600">
                {bills.length} bill{bills.length !== 1 ? 's' : ''} generated
              </p>
            </div>
            <Link
              href="/dashboard/create-bill"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 md:px-6 md:py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold transition-colors shadow-lg text-sm md:text-base"
            >
              <FileText className="w-4 h-4 md:w-5 md:h-5" />
              <span>Create New Bill</span>
            </Link>
          </div>
        </div>

        {/* Bills List */}
        {bills.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 text-center">
            <FileText className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">No bills yet</h3>
            <p className="text-sm md:text-base text-gray-600 mb-6">
              Create your first bill to get started
            </p>
            <Link
              href="/dashboard/create-bill"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold transition-colors"
            >
              <FileText className="w-5 h-5" />
              Create Bill
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {bills.map((bill) => (
              <div
                key={bill._id}
                className="bg-white rounded-xl md:rounded-2xl border border-gray-200 p-4 md:p-6 hover:shadow-lg transition-all duration-200 group"
              >
                {/* Bill Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4 text-gray-400" />
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">
                        {bill.customerId?.name || "Customer"}
                      </h3>
                    </div>
                    <p className="text-xs md:text-sm text-gray-500 font-mono">
                      {bill.customerId?.whatsappNumber}
                    </p>
                  </div>
                  <div className="p-2 bg-teal-50 rounded-lg">
                    <FileText className="w-4 h-4 md:w-5 md:h-5 text-teal-600" />
                  </div>
                </div>

                {/* Bill Items */}
                <div className="mb-4 pb-4 border-b border-gray-100">
                  <p className="text-xs md:text-sm text-gray-500 mb-2">
                    {bill.items.length} item{bill.items.length !== 1 ? 's' : ''}
                  </p>
                  <div className="space-y-1">
                    {bill.items.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex justify-between text-xs md:text-sm">
                        <span className="text-gray-600 truncate mr-2">{item.name}</span>
                        <span className="text-gray-900 font-medium whitespace-nowrap">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    {bill.items.length > 2 && (
                      <p className="text-xs text-gray-400 italic">
                        +{bill.items.length - 2} more item{bill.items.length - 2 !== 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                </div>

                {/* Bill Total */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs md:text-sm text-gray-500">Subtotal</span>
                    <span className="text-xs md:text-sm text-gray-600">₹{bill.subtotal.toFixed(2)}</span>
                  </div>
                  {bill.discountPercent > 0 && (
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs md:text-sm text-gray-500">
                        Discount ({bill.discountPercent}%)
                      </span>
                      <span className="text-xs md:text-sm text-red-500">
                        -₹{(bill.subtotal * bill.discountPercent / 100).toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-sm md:text-base font-semibold text-gray-900">Total</span>
                    <span className="text-base md:text-lg font-bold text-teal-600">
                      ₹{bill.finalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Bill Footer */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-xs md:text-sm text-gray-500 mb-3">
                    <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span>{formatDate(bill.createdAt)}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline">{formatTime(bill.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleShareBill(bill)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs md:text-sm font-medium transition-colors"
                      title="Share on WhatsApp"
                    >
                      <Share2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      <span>Share</span>
                    </button>
                    <Link
                      href={`/bill/${bill._id}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs md:text-sm font-medium transition-colors"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </Link>
                    <button
                      onClick={() => setDeletingBillId(bill._id)}
                      className="inline-flex items-center justify-center p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                      title="Delete bill"
                    >
                      <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deletingBillId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Delete Bill?</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this bill? This action cannot be undone.
            </p>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setDeletingBillId(null);
                  setError(null);
                }}
                disabled={deleting}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteBill(deletingBillId)}
                disabled={deleting}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 font-medium"
              >
                {deleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}