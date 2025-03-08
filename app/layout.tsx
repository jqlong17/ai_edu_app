import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./home-styles.css";
import { Navbar } from "@/components/layout/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI教学助手",
  description: "远择专业的教学人工智能助手，开启智能教学之旅",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <main className="min-h-screen pb-16">
          {children}
        </main>
        <Navbar />
      </body>
    </html>
  );
}
