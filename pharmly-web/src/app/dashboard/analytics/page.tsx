"use client";

import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, DollarSign, FileText, Users, Calendar, Loader2 } from "lucide-react";

type TimePeriod = "today" | "yesterday" | "7days" | "30days";

interface Bill {
  _id: string;
  customerId: { _id: string };
  finalAmount: number;
  createdAt: string;
}

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("today");
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/bills", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await res.json();
      if (result.success) {
        setBills(result.bills || []);
      }
    } catch (error) {
      console.error("Error fetching bills:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDateRange = (period: TimePeriod) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (period) {
      case "today":
        return { start: today, end: new Date() };
      case "yesterday": {
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        return { start: yesterday, end: today };
      }
      case "7days": {
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return { start: sevenDaysAgo, end: new Date() };
      }
      case "30days": {
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return { start: thirtyDaysAgo, end: new Date() };
      }
    }
  };

  const getFilteredData = () => {
    const { start, end } = getDateRange(selectedPeriod);
    
    const filteredBills = bills.filter(bill => {
      const billDate = new Date(bill.createdAt);
      return billDate >= start && billDate <= end;
    });

    const totalSales = filteredBills.reduce((sum, bill) => sum + bill.finalAmount, 0);
    const totalBills = filteredBills.length;
    
    // Get unique customers
    const uniqueCustomers = new Set(
      filteredBills
        .filter(bill => bill.customerId)
        .map(bill => bill.customerId._id)
    );

    const averageBillValue = totalBills > 0 ? totalSales / totalBills : 0;

    return {
      totalSales,
      totalBills,
      totalCustomers: uniqueCustomers.size,
      averageBillValue
    };
  };

  const getPreviousPeriodComparison = () => {
    const current = getFilteredData();
    
    // Get previous period data for comparison
    const { start, end } = getDateRange(selectedPeriod);
    const duration = end.getTime() - start.getTime();
    const prevStart = new Date(start.getTime() - duration);
    const prevEnd = new Date(start);
    
    const prevBills = bills.filter(bill => {
      const billDate = new Date(bill.createdAt);
      return billDate >= prevStart && billDate < prevEnd;
    });
    
    const prevTotal = prevBills.reduce((sum, bill) => sum + bill.finalAmount, 0);
    const prevBillsCount = prevBills.length;
    const growthPercent = prevTotal === 0 
      ? (current.totalSales > 0 ? 100 : 0)
      : ((current.totalSales - prevTotal) / prevTotal) * 100;

    const prevAvgBill = prevBillsCount > 0 ? prevTotal / prevBillsCount : 0;

    return { 
      prevTotal, 
      growthPercent,
      prevBillsCount,
      prevAvgBill
    };
  };

  const periodLabels = {
    today: "Today",
    yesterday: "Yesterday",
    "7days": "Last 7 Days",
    "30days": "Last 30 Days"
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-teal-200 border-t-teal-600"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const data = getFilteredData();
  const comparison = getPreviousPeriodComparison();

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-500 mt-1 text-sm md:text-base">Track sales and performance metrics</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Updated just now</span>
          </div>
        </div>
      </div>

      {/* Time Period Filter */}
      <div className="mb-6 md:mb-8">
        <div className="flex overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex gap-2 min-w-max">
            {(Object.keys(periodLabels) as TimePeriod[]).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                  selectedPeriod === period
                    ? "bg-teal-600 text-white shadow-md shadow-teal-100"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-teal-300 hover:bg-teal-50"
                }`}
              >
                {periodLabels[period]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Total Sales Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 md:p-3 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl">
              <DollarSign className="w-6 h-6 md:w-7 md:h-7 text-teal-600" />
            </div>
            {comparison.growthPercent !== 0 && (
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                comparison.growthPercent > 0 
                  ? "bg-green-50 text-green-700 border border-green-100" 
                  : "bg-red-50 text-red-700 border border-red-100"
              }`}>
                {comparison.growthPercent > 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{Math.abs(comparison.growthPercent).toFixed(1)}%</span>
              </div>
            )}
          </div>
          
          <h3 className="text-gray-500 text-sm font-medium mb-1">Total Sales</h3>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">
            ₹{data.totalSales.toLocaleString('en-IN')}
          </p>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Previous period</span>
              <span className="font-medium text-gray-700">
                ₹{comparison.prevTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Total Bills Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 md:p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <FileText className="w-6 h-6 md:w-7 md:h-7 text-blue-600" />
            </div>
            <div className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1.5 rounded-full">
              {periodLabels[selectedPeriod]}
            </div>
          </div>
          
          <h3 className="text-gray-500 text-sm font-medium mb-1">Total Bills</h3>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">{data.totalBills}</p>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Previous period</span>
              <span className="font-medium text-gray-700">{comparison.prevBillsCount}</span>
            </div>
          </div>
        </div>

        {/* Total Customers Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 md:p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <Users className="w-6 h-6 md:w-7 md:h-7 text-purple-600" />
            </div>
            <div className="text-xs font-medium text-purple-600 bg-purple-50 px-2.5 py-1.5 rounded-full">
              {periodLabels[selectedPeriod]}
            </div>
          </div>
          
          <h3 className="text-gray-500 text-sm font-medium mb-1">Unique Customers</h3>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">{data.totalCustomers}</p>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              {data.totalBills > 0 
                ? `${Math.round((data.totalCustomers / data.totalBills) * 100)}% repeat rate`
                : "No bills yet"
              }
            </p>
          </div>
        </div>
      </div>

      {/* Average Bill Value & Insights */}
      <div className="mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Average Bill Value */}
        <div className="bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 rounded-xl p-5 md:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-white/50 rounded-xl">
              <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-teal-700" />
            </div>
            <div>
              <h3 className="text-gray-900 font-medium">Average Bill Value</h3>
              <p className="text-sm text-teal-700">Higher is better</p>
            </div>
          </div>
          
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-gray-900">
                ₹{data.averageBillValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                From {data.totalBills} bills
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">Previous</div>
              <div className="text-lg font-semibold text-gray-700">
                ₹{comparison.prevAvgBill.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </div>
              <div className={`text-xs mt-1 ${
                data.averageBillValue > comparison.prevAvgBill ? 'text-green-600' : 'text-red-600'
              }`}>
                {data.averageBillValue > comparison.prevAvgBill ? '↑' : '↓'} 
                {Math.abs(((data.averageBillValue - comparison.prevAvgBill) / comparison.prevAvgBill) * 100 || 0).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 md:p-6">
          <h3 className="text-gray-900 font-medium mb-4">Performance Insights</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Sales growth</span>
              <span className={`text-sm font-medium ${
                comparison.growthPercent > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {comparison.growthPercent > 0 ? '+' : ''}{comparison.growthPercent.toFixed(1)}%
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Customer conversion</span>
              <span className="text-sm font-medium text-gray-900">
                {data.totalBills > 0 
                  ? `${((data.totalCustomers / data.totalBills) * 100).toFixed(0)}%`
                  : "0%"
                }
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Revenue per customer</span>
              <span className="text-sm font-medium text-gray-900">
                ₹{data.totalCustomers > 0 
                  ? (data.totalSales / data.totalCustomers).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                  : "0"
                }
              </span>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Period: {periodLabels[selectedPeriod]}
            </p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {data.totalBills === 0 && (
        <div className="mt-8 text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-50 rounded-full mb-4">
            <FileText className="w-8 h-8 text-teal-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bills found</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Start creating bills to see your sales analytics for {periodLabels[selectedPeriod].toLowerCase()}
          </p>
        </div>
      )}
    </div>
  );
}