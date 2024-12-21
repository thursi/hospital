"use client";
import {
  getDepartmentData,
  getDoctorData,
  getMedicinesData,
  getPetData,
} from "@/app/home/action";
import { useDepartmentStore } from "@/store/departmentStore";
import { useDoctorStore } from "@/store/doctorStore";
import { usePetStore } from "@/store/petStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "../../public/logowhite.png";
import Logoeffect from "../../public/stubby.png";
import changePasswordImage from "../../public/changePassword.jpg";

import SideBarIcon from "@/components/svg/side_bar_icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import DoctorPopover from "./DoctorPopover";
import UserIcon from "./svg/user_icon";
import { signOut } from "@/api/route";

export default function DoctorHeader() {
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

  // const [medicines, setAllMedicines] = useMedicinesStore((state: any) => [
  //   state.medicines,
  //   state.setAllMedicines,
  // ]);

  // State to track scroll position
  const [headerBg, setHeaderBg] = useState("bg-transparent");
  const [textColor, setTextColor] = useState("text-white"); // Default text color
  const [logo, setLogo] = useState(Logo); // Default logo

  useEffect(() => {
    setHeaderBg("bg-white bg-opacity-90");
    setTextColor("text-black");
    setLogo(Logoeffect);
  }, []);

  const fetchData = async () => {
    try {
      const petData = await getPetData();
      const departmentData = await getDepartmentData();
      const doctorData = await getDoctorData();
      const medicinesData = await getMedicinesData();
      setAllDepartments(departmentData);
      // setAllMedicines(medicinesData);
      setAllPets(petData);
      setAllDoctors(doctorData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [open, setOpen] = useState(false);

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
                  <li key={0}>
                    <a href="/" className="hover:text-red-500">
                      My Profile
                    </a>
                  </li>
                  <li key={1}>
                    <a href="/" className="hover:text-red-500">
                      Home
                    </a>
                  </li>
                  <li key={2}>
                    <a href="/aboutus" className="hover:text-red-500">
                      About Us
                    </a>
                  </li>

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
                   onClick={() =>  async () =>  await signOut()}
                  className="bg-red-500 hover:bg-yellow-500 text-white px-4 py-1 rounded absolute bottom-8">
                    <a href="/auth?mode=signin" className="hover:text-black">
                      Sign Out
                    </a>
                  </li>
                </ul>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden md:flex md:items-center w-full">
            <a href="/">
              <Image src={logo} alt="Company Logo" className="w-36" />
            </a>
            <nav className="flex-1 flex justify-center">
              <ul className="flex space-x-16 ">
                {/* Navbar items */}
                <li key={0}>
                  <a href="/" className="hover:text-red-500">
                    Home
                  </a>
                </li>
                <li key={1}>
                  <a href="/aboutus" className="hover:text-red-500">
                    About Us
                  </a>
                </li>
                <li className="relative">
                  <a href="/pets" className="hover:text-red-500">
                    Appointments
                  </a>
                </li>
              </ul>
            </nav>
            <Popover>
              <PopoverTrigger>
                <div className="flex space-x-4 cursor-pointer">
                  <UserIcon />
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <DoctorPopover />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>
    </>
  );
}
