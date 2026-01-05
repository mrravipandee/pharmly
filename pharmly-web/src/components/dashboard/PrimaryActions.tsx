import Link from "next/link";

export default function PrimaryActions() {
  return (
    <>
      {/* Desktop / Tablet */}
      <div className="hidden md:flex items-center gap-4 mb-6">
        <Link
          href="/dashboard/create-bill"
          className="
            inline-flex items-center justify-center
            rounded-lg bg-teal-600 px-6 py-3
            text-white font-medium
            hover:bg-teal-700 transition
          "
        >
          + Create New Bill
        </Link>

        <Link
          href="/dashboard/bills"
          className="
            inline-flex items-center justify-center
            rounded-lg border border-gray-300
            px-6 py-3 text-gray-700
            hover:bg-gray-100 transition
          "
        >
          View All Bills
        </Link>
      </div>

      {/* Mobile Sticky Action */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <Link
          href="/dashboard/create-bill"
          className="
            flex items-center justify-center
            w-full rounded-lg
            bg-teal-600 py-4
            text-white text-base font-semibold
            hover:bg-teal-700 transition
          "
        >
          + Create New Bill
        </Link>
      </div>
    </>
  );
}
