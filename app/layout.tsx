import type { Metadata } from "next";
import { DM_Sans, Instrument_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Snake Oil Signs",
  description:
    "Los Angeles based hand-painted murals and signage. Over a decade of experience. Nationally mobile.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${instrumentSans.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
