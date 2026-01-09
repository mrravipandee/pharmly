import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface Bill {
  _id: string;
  customerId: {
    name: string;
    whatsappNumber: string;
  };
  finalAmount: number;
  createdAt: string;
}

interface RecentBillsListProps {
  bills: Bill[];
}

export default function RecentBillsList({ bills }: RecentBillsListProps) {
  const maskPhone = (phone: string) => {
    if (phone.length <= 5) return phone;
    return phone;
  };

  const formatTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return "recently";
    }
  };

  return (
    <section className="mb-20 md:mb-8">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Recent Bills
        </h2>

        <Link
          href="/dashboard/bills"
          className="text-sm text-teal-600 hover:underline"
        >
          View all
        </Link>
      </div>

      {/* Bills List */}
      <div className="space-y-3">
        {bills.filter(bill => bill.customerId).map((bill) => (
          <div
            key={bill._id}
            className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4"
          >
            <div>
              <p className="text-sm font-medium text-gray-900">
                {bill.customerId?.whatsappNumber ? maskPhone(bill.customerId.whatsappNumber) : 'Unknown'}
              </p>
              <p className="text-xs text-gray-500">
                {formatTime(bill.createdAt)}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-sm font-semibold text-gray-900">
                ₹{bill.finalAmount.toFixed(0)}
              </p>

              <Link
                href={`/bill/${bill._id}`}
                className="text-sm text-teal-600 hover:underline"
                title="View bill"
              >
                Resend
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
