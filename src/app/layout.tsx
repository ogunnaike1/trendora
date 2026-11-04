import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Shell from "@/components/Shell";

const instrument = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin"], weight: "400" });
const hanken = Hanken_Grotesk({ variable: "--font-hanken", subsets: ["latin"], weight: ["300", "400", "500"] });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const DESCRIPTION = "Considered objects for a calmer home — lighting, vases, textiles, candles and tableware, handpicked from small studios.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Trendora — Considered home accessories", template: "%s — Trendora" },
  description: DESCRIPTION,
  applicationName: "Trendora",
  keywords: ["home accessories", "home decor", "lighting", "vases", "textiles", "candles", "tableware"],
  openGraph: { type: "website", siteName: "Trendora", title: "Trendora — Considered home accessories", description: DESCRIPTION, locale: "en_US" },
  twitter: { card: "summary_large_image", title: "Trendora — Considered home accessories", description: DESCRIPTION },
};

export const viewport: Viewport = { themeColor: "#405B70" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${instrument.variable} ${hanken.variable}`}>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
