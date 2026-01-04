import Link from "next/link";

export default function Hero() {
    return (
        <section className="bg-white">
            <div className="mx-auto max-w-7xl px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

                {/* LEFT — TEXT */}
                <div>
                    <span className="inline-block rounded-full bg-teal-50 px-4 py-1 text-sm font-medium text-teal-700">
                        Built for medical stores
                    </span>

                    <h1 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                        Smart billing for
                        <span className="text-teal-600"> modern medical stores</span>
                    </h1>

                    <p className="mt-5 text-lg text-gray-600 max-w-xl">
                        Create bills, send them on WhatsApp, track customers and daily sales —
                        all from one simple dashboard.
                    </p>

                    {/* CTA */}
                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link
                            href="/register"
                            className="
                inline-flex items-center justify-center
                rounded-lg bg-teal-600 px-6 py-3
                text-base font-semibold text-white
                hover:bg-teal-700 transition
              "
                        >
                            Get Started Free
                        </Link>

                        <Link
                            href="#how-it-works"
                            className="
                inline-flex items-center justify-center
                rounded-lg border border-gray-300
                px-6 py-3 text-base font-medium
                text-gray-700 hover:border-teal-600
                hover:text-teal-600 transition
              "
                        >
                            See how it works
                        </Link>
                    </div>

                    {/* TRUST LINE */}
                    <p className="mt-6 text-sm text-gray-500">
                        No ads • No spam • Your data stays private
                    </p>
                </div>

                {/* RIGHT — VISUAL (placeholder dashboard card) */}
                <div className="relative">
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-700">
                                Today’s Sales
                            </p>
                            <span className="text-sm text-teal-600 font-semibold">
                                +12%
                            </span>
                        </div>

                        <p className="mt-3 text-3xl font-bold text-gray-900">
                            ₹ 18,420
                        </p>

                        <div className="mt-6 space-y-3">
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Shree Sai Medical</span>
                                <span>₹ 490</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Om Pharma</span>
                                <span>₹ 1,120</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>New Customer</span>
                                <span>₹ 350</span>
                            </div>
                        </div>
                    </div>

                    {/* subtle background accent */}
                    <div className="absolute -z-10 -top-6 -right-6 h-full w-full rounded-xl bg-teal-50"></div>
                </div>

            </div>
        </section>
    );
}
