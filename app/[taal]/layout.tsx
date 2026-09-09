import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TALEN, isTaal } from "@/lib/i18n";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const META = {
  nl: {
    titel:
      "POS-2FA-Intermediary — Proactieve diefstalpreventie voor zelfscankassa's",
    beschrijving:
      "Gepatenteerde antidiefstalmethode voor zelfscankassa's: tweevoudige artikelauthenticatie (2FA) met dual-technology — QR-codes en RFID-tags — voorkomt winkeldiefstal proactief bij de bron.",
    ogBeschrijving:
      "Van reactieve naar proactieve diefstalpreventie: 2FA-artikelauthenticatie met QR-codes en RFID-tags maakt einde aan winkeldiefstal bij zelfscankassa's.",
    locale: "nl_NL",
    skiplink: "Direct naar de inhoud",
  },
  en: {
    titel:
      "POS-2FA-Intermediary — Proactive theft prevention for self-checkouts",
    beschrijving:
      "Patented anti-theft method for self-checkouts: two-factor article authentication (2FA) with dual technology — QR codes and RFID tags — proactively prevents shoplifting at the source.",
    ogBeschrijving:
      "From reactive to proactive theft prevention: 2FA article authentication with QR codes and RFID tags puts an end to shoplifting at self-checkouts.",
    locale: "en_US",
    skiplink: "Skip to content",
  },
} as const;

export function generateStaticParams() {
  return TALEN.map((taal) => ({ taal }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[taal]">): Promise<Metadata> {
  const { taal } = await params;
  const meta = META[isTaal(taal) ? taal : "nl"];
  return {
    metadataBase: new URL("https://pos-2fa-intermediary.com"),
    title: {
      default: meta.titel,
      template: "%s | POS-2FA-Intermediary",
    },
    description: meta.beschrijving,
    openGraph: {
      type: "website",
      locale: meta.locale,
      siteName: "POS-2FA-Intermediary",
      title: meta.titel,
      description: meta.ogBeschrijving,
      images: ["/og.png"],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[taal]">) {
  const { taal } = await params;
  if (!isTaal(taal)) notFound();

  return (
    <html
      lang={taal}
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#hoofdinhoud"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-blue-700 focus:px-4 focus:py-2 focus:text-white"
        >
          {META[taal].skiplink}
        </a>
        <Header taal={taal} />
        <main id="hoofdinhoud" className="flex-1">
          {children}
        </main>
        <Footer taal={taal} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
