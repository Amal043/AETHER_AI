import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/common/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AETHER Analytics | AI-Powered Funnel & Supply Chain Intelligence",
  description:
    "Enterprise AI-powered analytics platform for e-commerce funnel optimization, supply chain profiling, and real-time data ingestion.",
  keywords: [
    "E-Commerce Analytics",
    "Supply Chain Intelligence",
    "Data Profiling",
    "FastAPI",
    "Next.js 15",
    "Enterprise Analytics",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body className="bg-[#F8FAFC] text-slate-900 font-sans antialiased overflow-x-hidden">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
