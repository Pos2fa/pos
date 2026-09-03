import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pos-2fa-intermediary.com"),
  title: {
    default:
      "POS-2FA-Intermediary — Proactieve diefstalpreventie voor zelfscankassa's",
    template: "%s | POS-2FA-Intermediary",
  },
  description:
    "Gepatenteerde antidiefstalmethode voor zelfscankassa's: tweevoudige artikelauthenticatie (2FA) met dual-technology — QR-codes en RFID-tags — voorkomt winkeldiefstal proactief bij de bron.",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "POS-2FA-Intermediary",
    title:
      "POS-2FA-Intermediary — Proactieve diefstalpreventie voor zelfscankassa's",
    description:
      "Van reactieve naar proactieve diefstalpreventie: 2FA-artikelauthenticatie met QR-codes en RFID-tags maakt einde aan winkeldiefstal bij zelfscankassa's.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="nl"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#hoofdinhoud"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-blue-700 focus:px-4 focus:py-2 focus:text-white"
        >
          Direct naar de inhoud
        </a>
        <Header />
        <main id="hoofdinhoud" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
