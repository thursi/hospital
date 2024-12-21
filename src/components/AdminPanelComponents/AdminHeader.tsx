"use client";
import { signOut } from "@/api/route";
import {
  getDepartmentData,
  getDoctorData,
  getMedicinesData,
  getPetData,
} from "@/app/home/action";
import SideBarIcon from "@/components/svg/side_bar_icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useDepartmentStore } from "@/store/departmentStore";
import { useDoctorStore } from "@/store/doctorStore";
import { useMedicineStore } from "@/store/medicinesStore";
import { usePetStore } from "@/store/petStore";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import changePasswordImage from "../../../public/changePassword.jpg";
import {
  default as Logo,
  default as Logoeffect,
} from "../../../public/stubby.png";
import UserIcon from "../svg/user_icon";
import AdminPopover from "./AdminPopover";

export default function AdminHeader() {
  const pathname = usePathname();
  const [doctors, setAllDoctors] = useDoctorStore((state: any) => [
    state.doctors,
    state.setAllDoctors,
  ]);
  const [departments, setAllDepartments] = useDepartmentStore((state: any) => [
    state.departments,
    state.setAllDepartments,
  ]);
  const [pets, setAllPets] = usePetStore((state: any) => [
    state.pets,
    state.setAllPets,
  ]);
  const [medicines, setAllMedicines] = useMedicineStore((state: any) => [
    state.medicines,
    state.setAllMedicines,
  ]);

  // State to track scroll position
  const [headerBg, setHeaderBg] = useState("bg-transparent");
  const [textColor, setTextColor] = useState("text-white"); // Default text color
  const [logo, setLogo] = useState(Logo); // Default logo

  useEffect(() => {
    setHeaderBg("bg-white bg-opacity-90");
    setTextColor("text-black");
    setLogo(Logoeffect);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const petData = await getPetData();
      const departmentData = await getDepartmentData();
      const doctorData = await getDoctorData();
      const medicinesData = await getMedicinesData();
      setAllDepartments(departmentData);
      setAllMedicines(medicinesData);
      setAllPets(petData);
      setAllDoctors(doctorData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [setAllDepartments, setAllMedicines, setAllPets, setAllDoctors]);

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Include fetchData in the dependency array

  const [open, setOpen] = useState(false);
  const [sOpen, setSOpen] = useState(false);
  console.log(pathname);

  const router = useRouter();

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-10 transition-all duration-300 ${headerBg}`}
      >
        <div
          className={`w-full h-fit flex flex-col md:flex-row justify-between items-center px-8 py-2 ${textColor}`}
        >
          <div className="flex justify-between items-center w-full md:hidden">
            <a href="/">
              <Image src={logo} alt="Company Logo" className="w-36" />
            </a>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger className="px-1">
                <SideBarIcon />
              </SheetTrigger>
              <SheetContent
                className={`h-full flex flex-col items-start ${textColor}`}
              >
                <Image src={logo} className="w-[288px]" alt="Company Logo" />
                <ul className="flex flex-col space-y-4 gap-2">
                  {/* Sidebar items */}
                  <li>
                    <div className="w-full h-fit flex gap-3 items-center">
                      <a
                        href="/changepassword"
                        className="flex items-center gap-3"
                      >
                        <div className="w-15 h-15">
                          <Image
                            src={changePasswordImage}
                            alt="Doctor"
                            className="w-10 h-15 rounded-full object-cover"
                          />
                        </div>
                        <div className="font-semibold">Change Password</div>
                      </a>
                    </div>
                  </li>

                  <li
                    onClick={async () => await signOut()}
                    className="bg-red-500 hover:bg-yellow-500 text-white px-4 py-1 rounded absolute bottom-8"
                  >
                    <a href="/auth?mode=signin" className="hover:text-black">
                      Sign Out
                    </a>
                  </li>
                </ul>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden md:flex md:justify-between md:items-center w-full">
            <a className="justify-self-center" href="/admin-dashboard">
              <Image src={logo} alt="Company Logo" className="w-36" />
            </a>
            <Popover>
              <PopoverTrigger>
                <div className="flex space-x-4 cursor-pointer">
                  <UserIcon />
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <AdminPopover />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>
    </>
  );
}
