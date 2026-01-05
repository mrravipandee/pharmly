"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { 
  Store, 
  User, 
  Phone, 
  Calendar, 
  FileText, 
  Loader2, 
  AlertCircle,
  Download,
  Share2,
  ArrowLeft,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import Link from "next/link";

interface BillItem {
  name: string;
  price: number;
  quantity: number;
  total: number;
}

interface Customer {
  name: string;
  age?: number;
  sex?: string;
  whatsappNumber: string;
}

interface StoreInfo {
  name: string;
  address: string;
  city: string;
  whatsappNumber: string;
}

interface BillData {
  store: StoreInfo;
  customer: Customer;
  currentBill: {
    id: string;
    items: BillItem[];
    subtotal: number;
    discountPercent: number;
    finalAmount: number;
    date: string;
  };
  previousBills: Array<{
    _id: string;
    finalAmount: number;
    createdAt: string;
    items: BillItem[];
    subtotal: number;
    discountPercent: number;
  }>;
}

export default function BillDetailsPage() {
  const params = useParams();
  const billId = params.id as string;
  const [billData, setBillData] = useState<BillData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedBills, setExpandedBills] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (billId) {
      fetchBillDetails();
    }
  }, [billId]);

  const fetchBillDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/bills/public/${billId}`);
      const data = await res.json();

      if (data.success) {
        setBillData(data.data);
      } else {
        setError(data.message || "Failed to load bill details");
      }
    } catch (err) {
      setError("Failed to load bill details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", { 
      day: "numeric", 
      month: "long", 
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

  const handleShare = () => {
    const url = window.location.href;
    const message = `Hi ${billData?.customer.name}, here is your bill from ${billData?.store.name}. Total: ₹${billData?.currentBill.finalAmount}. View: ${url}`;
    const whatsappUrl = `https://wa.me/+91${billData?.customer.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const toggleBillExpansion = (billId: string) => {
    setExpandedBills(prev => {
      const newSet = new Set(prev);
      if (newSet.has(billId)) {
        newSet.delete(billId);
      } else {
        newSet.add(billId);
      }
      return newSet;
    });
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 md:w-12 md:h-12 animate-spin text-teal-600 mx-auto mb-4" />
          <p className="text-sm md:text-base text-gray-600">Loading bill details...</p>
        </div>
      </div>
    );
  }

  if (error || !billData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-red-50 border border-red-200 rounded-xl md:rounded-2xl p-6 md:p-8 max-w-md w-full">
          <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-red-600 mx-auto mb-3 md:mb-4" />
          <p className="text-sm md:text-base text-red-600 text-center">{error || "Bill not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Actions - Hidden on Print */}
        <div className="mb-4 md:mb-6 print:hidden">
          <div className="flex justify-end">
            <div className="flex gap-2 md:gap-3 w-full sm:w-auto">
              <button
                onClick={handleShare}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg md:rounded-xl font-semibold transition-colors text-sm md:text-base"
              >
                <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                Share on WhatsApp
              </button>
              <button
                onClick={handlePrint}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg md:rounded-xl font-semibold transition-colors text-sm md:text-base"
              >
                <Download className="w-4 h-4 md:w-5 md:h-5" />
                Print
              </button>
            </div>
          </div>
        </div>

        {/* Bill Content */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Store Header */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-4 md:p-6 lg:p-8">
            <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
              <div className="p-2 md:p-3 bg-white/20 rounded-lg md:rounded-xl">
                <Store className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
              </div>
              <div className="flex-1">
                <h1 className="text-lg md:text-xl lg:text-2xl font-bold mb-1 md:mb-2">
                  {billData.store.name}
                </h1>
                <p className="text-xs md:text-sm lg:text-base text-teal-50 mb-0.5 md:mb-1">
                  {billData.store.address}
                </p>
                <p className="text-xs md:text-sm lg:text-base text-teal-50 mb-0.5 md:mb-1">
                  {billData.store.city}
                </p>
                <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm lg:text-base text-teal-50">
                  <Phone className="w-3 h-3 md:w-4 md:h-4" />
                  <span>+91 {billData.store.whatsappNumber}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 md:gap-3 pt-3 md:pt-4 border-t border-teal-400">
              <div className="flex items-center gap-1.5 md:gap-2">
                <FileText className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-xs md:text-sm lg:text-base font-semibold">
                  Bill #{billData.currentBill.id.slice(-6).toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm lg:text-base">
                <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                <span>{formatDate(billData.currentBill.date)} at {formatTime(billData.currentBill.date)}</span>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="p-4 md:p-6 lg:p-8 bg-gray-50 border-b border-gray-200">
            <div className="flex items-start gap-2 md:gap-3">
              <div className="p-2 md:p-2.5 bg-teal-50 rounded-lg">
                <User className="w-4 h-4 md:w-5 md:h-5 text-teal-600" />
              </div>
              <div>
                <h2 className="text-sm md:text-base lg:text-lg font-semibold text-gray-900 mb-1">
                  {billData.customer.name}
                </h2>
                <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-sm text-gray-600">
                  {billData.customer.age && (
                    <span>{billData.customer.age} years</span>
                  )}
                  {billData.customer.sex && (
                    <>
                      <span>•</span>
                      <span className="capitalize">{billData.customer.sex}</span>
                    </>
                  )}
                  <span>•</span>
                  <div className="flex items-center gap-1 md:gap-1.5">
                    <Phone className="w-3 h-3 md:w-4 md:h-4" />
                    <span>{billData.customer.whatsappNumber}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bill Items */}
          <div className="p-4 md:p-6 lg:p-8">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">
              Items ({billData.currentBill.items.length})
            </h3>
            
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Item</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Price</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Qty</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {billData.currentBill.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-3 px-4 text-sm text-gray-900">{item.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-600 text-right">₹{item.price.toFixed(2)}</td>
                      <td className="py-3 px-4 text-sm text-gray-600 text-center">×{item.quantity}</td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-900 text-right">₹{item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {billData.currentBill.items.map((item, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-medium text-gray-900 flex-1">{item.name}</h4>
                    <span className="text-sm font-bold text-teal-600 ml-2">₹{item.total.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>₹{item.price.toFixed(2)} × {item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
              <div className="space-y-2 md:space-y-3 max-w-sm ml-auto">
                <div className="flex justify-between text-sm md:text-base text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{billData.currentBill.subtotal.toFixed(2)}</span>
                </div>
                {billData.currentBill.discountPercent > 0 && (
                  <div className="flex justify-between text-sm md:text-base text-red-600">
                    <span>Discount ({billData.currentBill.discountPercent}%)</span>
                    <span>-₹{(billData.currentBill.subtotal * billData.currentBill.discountPercent / 100).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base md:text-lg lg:text-xl font-bold text-gray-900 pt-2 md:pt-3 border-t border-gray-300">
                  <span>Total Amount</span>
                  <span className="text-teal-600">₹{billData.currentBill.finalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Previous Bills */}
          {billData.previousBills.length > 0 && (
            <div className="p-4 md:p-6 lg:p-8 bg-gray-50 border-t border-gray-200 print:hidden">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">
                Previous Bills ({billData.previousBills.length})
              </h3>
              <div className="space-y-3 md:space-y-4">
                {billData.previousBills.map((bill) => (
                  <div
                    key={bill._id}
                    className="bg-white rounded-lg md:rounded-xl border border-gray-200 overflow-hidden"
                  >
                    {/* Bill Header - Clickable */}
                    <button
                      onClick={() => toggleBillExpansion(bill._id)}
                      className="w-full p-3 md:p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <FileText className="w-4 h-4 md:w-5 md:h-5 text-teal-600" />
                        <div className="text-left">
                          <p className="text-sm md:text-base font-medium text-gray-900">
                            Bill #{bill._id.slice(-6).toUpperCase()}
                          </p>
                          <p className="text-xs md:text-sm text-gray-500">
                            {formatDate(bill.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-base md:text-lg font-bold text-teal-600">
                          ₹{bill.finalAmount.toFixed(0)}
                        </span>
                        {expandedBills.has(bill._id) ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </button>

                    {/* Expanded Bill Details */}
                    {expandedBills.has(bill._id) && (
                      <div className="border-t border-gray-200 p-3 md:p-4 bg-gray-50">
                        {/* Items - Mobile Cards */}
                        <div className="md:hidden space-y-2 mb-3">
                          {bill.items.map((item, idx) => (
                            <div key={idx} className="bg-white rounded-lg p-2.5 border border-gray-200">
                              <div className="flex justify-between items-start mb-1.5">
                                <h4 className="text-xs font-medium text-gray-900 flex-1">{item.name}</h4>
                                <span className="text-xs font-bold text-teal-600 ml-2">₹{item.total.toFixed(2)}</span>
                              </div>
                              <div className="text-xs text-gray-600">
                                ₹{item.price.toFixed(2)} × {item.quantity}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Items - Desktop Table */}
                        <div className="hidden md:block overflow-x-auto mb-4">
                          <table className="w-full text-sm">
                            <thead className="bg-white border-b border-gray-200">
                              <tr>
                                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Item</th>
                                <th className="text-right py-2 px-3 text-xs font-semibold text-gray-700">Price</th>
                                <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Qty</th>
                                <th className="text-right py-2 px-3 text-xs font-semibold text-gray-700">Total</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                              {bill.items.map((item, idx) => (
                                <tr key={idx}>
                                  <td className="py-2 px-3 text-xs text-gray-900">{item.name}</td>
                                  <td className="py-2 px-3 text-xs text-gray-600 text-right">₹{item.price.toFixed(2)}</td>
                                  <td className="py-2 px-3 text-xs text-gray-600 text-center">×{item.quantity}</td>
                                  <td className="py-2 px-3 text-xs font-medium text-gray-900 text-right">₹{item.total.toFixed(2)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Summary */}
                        <div className="space-y-1.5 md:space-y-2 bg-white rounded-lg p-3 md:p-4">
                          <div className="flex justify-between text-xs md:text-sm text-gray-600">
                            <span>Subtotal</span>
                            <span>₹{bill.subtotal.toFixed(2)}</span>
                          </div>
                          {bill.discountPercent > 0 && (
                            <div className="flex justify-between text-xs md:text-sm text-red-600">
                              <span>Discount ({bill.discountPercent}%)</span>
                              <span>-₹{(bill.subtotal * bill.discountPercent / 100).toFixed(2)}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-sm md:text-base font-bold text-gray-900 pt-1.5 md:pt-2 border-t border-gray-200">
                            <span>Total</span>
                            <span className="text-teal-600">₹{bill.finalAmount.toFixed(2)}</span>
                          </div>
                        </div>

                        {/* View Full Bill Link */}
                        <Link
                          href={`/bill/${bill._id}`}
                          className="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors text-sm"
                        >
                          View Full Bill
                          <ArrowLeft className="w-4 h-4 rotate-180" />
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 md:mt-6 text-center text-xs md:text-sm text-gray-500 print:block">
          <p>Thank you for your business!</p>
          <p className="mt-1">This is a computer-generated bill.</p>
        </div>
      </div>
    </div>
  );
}