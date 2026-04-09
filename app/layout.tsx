import type { Metadata } from "next";
import { DM_Sans, Special_Gothic_Expanded_One } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

const specialGothic = Special_Gothic_Expanded_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
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
    <html lang="en" className={`${dmSans.variable} ${specialGothic.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
