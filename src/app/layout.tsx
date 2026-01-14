import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CosmicGutter | Master Dispatch",
  description: "Advanced Fleet & Schedule Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground relative`}
      >
        {/* --- FULL SCREEN COSMIC BACKGROUND --- */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          {/* Ambient Glows */}
          <div className="absolute -top-[10%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-500/10 blur-[120px] dark:bg-blue-600/15" />
          <div className="absolute -bottom-[10%] -left-[10%] w-[70%] h-[70%] rounded-full bg-emerald-500/10 blur-[120px] dark:bg-emerald-600/10" />

          {/* Edge-to-Edge Engineering Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        {/* --- FULL WIDTH CONTENT --- */}
        <main className="w-full min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
