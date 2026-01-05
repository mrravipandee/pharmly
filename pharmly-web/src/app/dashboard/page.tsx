"use client";

import { useState, useEffect } from "react";
import DashboardEmptyState from "@/components/dashboard/DashboardEmptyState";
import DashboardStats from "@/components/dashboard/DashboardStats";
import PrimaryActions from "@/components/dashboard/PrimaryActions";
import RecentBillsList from "@/components/dashboard/RecentBillsList";

interface Bill {
  _id: string;
  customerId: {
    _id: string;
    name: string;
    whatsappNumber: string;
  };
  items: Array<{
    name: string;
    price: number;
    quantity: number;
    total: number;
  }>;
  subtotal: number;
  discountPercent: number;
  finalAmount: number;
  createdAt: string;
}

interface DashboardData {
  todaySales: number;
  billsToday: number;
  customersToday: number;
  avgBillValue: number;
  recentBills: Bill[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const res = await fetch("/api/bills", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const result = await res.json();

      if (result.success && result.bills) {
        const bills: Bill[] = result.bills;
        
        // Calculate stats
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const todayBills = bills.filter((bill: Bill) => {
          if (!bill.createdAt) return false;
          const billDate = new Date(bill.createdAt);
          billDate.setHours(0, 0, 0, 0);
          return billDate.getTime() === today.getTime();
        });

        const todaySales = todayBills.reduce((sum: number, bill: Bill) => sum + bill.finalAmount, 0);
        // Filter out bills without customerId before mapping
        const uniqueCustomerIds = new Set(
          todayBills
            .filter((bill: Bill) => bill.customerId && bill.customerId._id)
            .map((bill: Bill) => bill.customerId._id)
        );
        const avgBillValue = todayBills.length > 0 ? todaySales / todayBills.length : 0;

        setData({
          todaySales,
          billsToday: todayBills.length,
          customersToday: uniqueCustomerIds.size,
          avgBillValue,
          recentBills: bills.slice(0, 4) // Get 4 most recent bills (any date)
        });
      } else {
        // No bills yet, set empty data
        setData({
          todaySales: 0,
          billsToday: 0,
          customersToday: 0,
          avgBillValue: 0,
          recentBills: []
        });
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  // Show empty state only if no bills exist at all
  if (!data) {
    return (
      <div>
        <DashboardStats 
          todaySales={0}
          billsToday={0}
          customersToday={0}
          avgBillValue={0}
        />
        <PrimaryActions />
        <DashboardEmptyState />
      </div>
    );
  }

  return (
    <div>
      <DashboardStats 
        todaySales={data.todaySales}
        billsToday={data.billsToday}
        customersToday={data.customersToday}
        avgBillValue={data.avgBillValue}
      />
      <PrimaryActions />
      {data.recentBills.length > 0 ? (
        <RecentBillsList bills={data.recentBills} />
      ) : (
        <DashboardEmptyState />
      )}
    </div>
  );
}  