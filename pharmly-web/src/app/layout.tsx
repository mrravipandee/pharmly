import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

/* ---------------- FONT ---------------- */

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

/* ---------------- METADATA (SEO) ---------------- */

export const metadata: Metadata = {
  title: {
    default: "Pharmly – Smart Billing for Medical Stores",
    template: "%s | Pharmly",
  },
  description:
    "Pharmly helps medical store owners create digital bills, send them on WhatsApp, manage customers, and track daily sales with ease.",
  applicationName: "Pharmly",
  keywords: [
    "medical billing software",
    "pharmacy billing app",
    "medical store billing",
    "whatsapp bill generator",
    "pharmacy management system",
    "india medical billing",
  ],
  authors: [{ name: "Pharmly Team" }],
  creator: "Pharmly",
  publisher: "Pharmly",
  metadataBase: new URL("https://pharmly.co.in"),

  openGraph: {
    title: "Pharmly – Smart Billing for Medical Stores",
    description:
      "Pharmly is a smart billing platform built for medical stores. Create digital medicine bills, apply discounts, and send bills instantly on WhatsApp. Track daily sales, manage repeat customers, and replace paper bills with a simple, reliable digital billing system.",
    url: "https://pharmly.co.in",
    images: [
      {
        url: "https://pharmly.co.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pharmly – Smart Billing for Medical Stores",
      },
    ],
    siteName: "Pharmly",
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Pharmly – Smart Billing for Medical Stores",
    description:
      "Simple, fast and WhatsApp-enabled billing software for medical stores.",
    creator: "@pharmly",
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
  },
};

/* ---------------- ROOT LAYOUT ---------------- */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${roboto.variable}
          font-sans
          bg-gray-50
          text-gray-900
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
