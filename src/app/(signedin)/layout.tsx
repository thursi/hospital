import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stubby",
  description: "Stubby ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full min-h-screen w-full flex flex-col">
      {/* <Header /> */}
      <div className="grow bg-gray-100">{children}</div>
      <div className="mt-auto justify-end">
        {/* <Footer /> */}
      </div>
    </div>
  );
}
