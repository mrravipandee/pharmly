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
      "Create digital bills, send on WhatsApp, and manage your medical store effortlessly with Pharmly.",
    url: "https://pharmly.co.in",
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
