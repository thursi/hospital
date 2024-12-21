import DoctorFooter from "@/components/DoctorFooter";
import DoctorHeader from "@/components/DoctorHeader";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stubby Doctor",
  description: "Doctor Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-full w-full flex flex-col relative bg-gray-100">
          <div className="sticky z-30 top-0 md:static h-fit">
            <DoctorHeader />
          </div>
          <div className="grow-0 mt-16 w-full max-w-[1024px] self-center overflow-y-auto">
            {children}
          </div>
          <div className="mt-auto w-full">
            <DoctorFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
