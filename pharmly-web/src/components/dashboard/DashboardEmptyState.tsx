import Link from "next/link";

export default function DashboardEmptyState() {
  return (
    <section className="mt-12 flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center">
      
      <h3 className="text-lg font-semibold text-gray-900">
        No bills yet
      </h3>

      <p className="mt-2 max-w-sm text-sm text-gray-600">
        You haven’t created any bills today. Start by creating your first bill
        and send it directly on WhatsApp.
      </p>

      <Link
        href="/dashboard/create-bill"
        className="
          mt-6 inline-flex items-center justify-center
          rounded-lg bg-teal-600 px-6 py-3
          text-white font-medium
          hover:bg-teal-700 transition
        "
      >
        + Create First Bill
      </Link>
    </section>
  );
}
