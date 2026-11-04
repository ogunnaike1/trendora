import type { Metadata } from "next";
import { Instrument_Serif, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Shell from "@/components/Shell";

const instrument = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });
const hanken = Hanken_Grotesk({ variable: "--font-hanken", subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: { default: "Trendora — Considered home accessories", template: "%s — Trendora" },
  description: "Premium home accessories: lighting, vases, textiles, candles and tableware, handpicked from small studios.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${instrument.variable} ${hanken.variable}`}>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
