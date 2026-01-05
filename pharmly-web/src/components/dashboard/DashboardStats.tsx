import StatCard from "./StatCard";

interface DashboardStatsProps {
  todaySales: number;
  billsToday: number;
  customersToday: number;
  avgBillValue: number;
}

export default function DashboardStats({
  todaySales,
  billsToday,
  customersToday,
  avgBillValue
}: DashboardStatsProps) {
  return (
    <section className="mb-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Today's Sales" value={`₹${todaySales.toFixed(0)}`} />
        <StatCard label="Bills Today" value={billsToday.toString()} />
        <StatCard label="Customers Today" value={customersToday.toString()} />
        <StatCard label="Avg Bill Value" value={`₹${avgBillValue.toFixed(0)}`} />
      </div>
    </section>
  );
}
