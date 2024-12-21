// import AdminHeader from "@/components/AdminPanelComponents/AdminHeader";
// import SideBar from "@/components/AdminPanelComponents/SideBar";
// import DoctorFooter from "@/components/DoctorFooter";
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Stubby Admin Panel",
//   description: "Stubby Admin Panel",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <div className="min-h-screen w-full flex flex-col bg-gray-100">
//           <div className="sticky z-30 top-0 h-fit">
//             <AdminHeader />
//           </div>
//           <div className="flex mt-16 w-full grow h-full">
//             <div className="fixed top-12 left-0 w-1/5 h-full bg-white">
//               <SideBar />
//             </div>
//             <div className="ml-[20%] w-full max-w-[1204px] overflow-y-auto pb-10">
//               {children}
//             </div>
//           </div>
//           <div className="mt-auto w-full z-40">
//             <DoctorFooter />
//           </div>
//         </div>
//       </body>
//     </html>
//   );
// }



import AdminHeader from "@/components/AdminPanelComponents/AdminHeader";
import SideBar from "@/components/AdminPanelComponents/SideBar";
import DoctorFooter from "@/components/DoctorFooter";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stubby Admin Panel",
  description: "Stubby Admin Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen w-full flex flex-col bg-gray-100">
          <div className="sticky z-30 top-0 h-fit">
            <AdminHeader />
          </div>
          <div className="flex mt-20 w-full grow h-full">
            <div className="fixed top-12 left-0 w-1/6 h-full bg-white">
              <SideBar />
            </div>
            <div className="ml-[18%] w-full max-w-[1350px] overflow-y-auto pb-10">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
