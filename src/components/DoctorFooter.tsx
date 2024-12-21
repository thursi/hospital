import {
  Facebook,
  Hospital,
  Instagram,
  Mail,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Logo from "../../public/stubby.png";

export default function DoctorFooter() {
  return (
    <div className="w-full bg-white flex justify-center h-fit py-4 px-5 md:px-2">
      <div className="flex w-full max-w-[1196px] justify-between flex-col md:flex-row h-fit px-3">
        <div className="flex flex-col py-3 md:w-1/4  w-full">
          <div>
            <Image src={Logo} alt="Company Logo" className="w-28" />
          </div>
          <div className="text-wrap py-2">
            Vethouse - Pet Care & Hospital Management & Veterinary Theme.
          </div>
        </div>
        <div className="flex flex-col py-3 md:w-1/4 px-1 w-full">
          <div className="font-semibold text-lg mb-4">Follow us</div>
          <div className="w-full flex gap-3 py-1">
            <Facebook className="hover:text-red-500" />
            <Twitter className="hover:text-red-500" />
            <Youtube className="hover:text-red-500" />
            <Instagram className="hover:text-red-500" />
          </div>
          <div className="w-full flex gap-1 py-2">
            <div className="text-red-500 hover:text-black">English</div>
            <div className="text-red-500 hover:text-black">English</div>
            <div className="text-red-500 hover:text-black">English</div>
          </div>
        </div>
        <div className="flex flex-col py-3 md:w-1/4 px-1 w-full gap-2">
          <div className="font-semibold text-lg mb-2">Departments</div>
          <div className="flex flex-col gap-4">
            <div className="w-full flex text-wrap items-center gap-3">
              <div>
                <Hospital className="text-red-500" />
              </div>
              <div className="">
                3891 Ranchview Dr. Richardson, California 62639
              </div>
            </div>
            <div className="w-full flex text-wrap items-center gap-3">
              <div>
                <Phone className="text-red-500" />
              </div>
              <div className="">+90 (5539102492)</div>
            </div>
            <div className="w-full flex text-wrap items-center gap-3">
              <div>
                <Mail className="text-red-500" />
              </div>
              <div className="">Vethouse@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
