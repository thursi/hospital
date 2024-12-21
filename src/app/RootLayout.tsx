// src/app/RootLayout.tsx
"use client"; // Mark this as a client component

import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation"; // Client-side hook
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stubby",
  description: "Stubby",
};

export default function RootLayout({
  children,
  token,
}: {
  children: React.ReactNode;
  token?: string;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/admin" || pathname?.startsWith("/admin/");

  return (
    <html lang="en">
      <body className={inter.className}>
        {isAuthPage ? (
          // Layout for authentication pages
          <div className="">
            {children}
            <Toaster richColors />
          </div>
        ) : (
          // Layout for other pages
          <div className="h-full w-full flex flex-col">
            <Header />
            <div className="min-h-screen">{children}</div>
            <Toaster richColors />
            <div className="mt-auto" style={{ maxHeight: "100vh" }}>
              <Footer />
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
