'use client';
import {
  BriefcaseMedical,
  Building,
  Calendar,
  Dog,
  Hospital,
  Stethoscope,
  Syringe,
  User,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

const SideBar = () => {
  const pathname = usePathname();
  return (
    <ul className="flex flex-col space-y-4 gap-2 w-full min-h-fit h-[80vh] font-semibold px-2 mt-16 relative">
      {/* Sidebar items */}

      {/* <li
          className={`text-black ${
            pathname.includes("/dashboard") && "bg-slate-300 text-black"
          } px-4 py-1 rounded flex items-center group`}
        >
          <a href="/dashboard" className="hover:text-black p-2">
            Dashboard
          </a>
        </li> */}

      <li
        className={`text-sm font-medium text-[#718096] text-left ${
          pathname.includes('/admin/hospitals') && 'bg-slate-300 text-black'
        } px-4 py-1 rounded flex items-center group`}
      >
        <Hospital className="mr-2 text-[#718096] group-hover:text-black transition-colors duration-200" />
        <a href="/admin/hospitals" className="hover:text-black p-2">
          Hospitals
        </a>
      </li>

      <li
        className={`text-sm font-medium text-[#718096] text-left ${
          pathname.includes('/admin/doctors') && 'bg-slate-300  text-black'
        } px-4 py-1 rounded flex items-center group group`}
      >
        <Stethoscope className="mr-2 text-[#718096] group-hover:text-black transition-colors duration-200" />
        <a href="/admin/doctors" className="hover:text-black p-2">
          Doctors
        </a>
      </li>

      <li
        className={`text-sm font-medium text-[#718096]text-left ${
          pathname.includes('/admin/medicines') && 'bg-slate-300 text-black'
        } px-4 py-1  rounded flex items-center group`}
      >
        <Syringe className="mr-2 text-[#718096] group-hover:text-black transition-colors duration-200" />
        <a href="/admin/medicines" className="hover:text-black p-2">
          Vaccination{' '}
        </a>
      </li>
      <li
        className={`text-sm font-medium text-[#718096] text-left ${
          pathname.includes('/admin/appointments') && 'bg-slate-300 text-black'
        } px-4 py-1 rounded flex items-center group`}
      >
        <Calendar className="mr-2 text-[#718096] group-hover:text-black transition-colors duration-200" />
        <a href="/admin/appointments" className="hover:text-black p-2">
          Appointments
        </a>
      </li>
      <li
        className={`text-sm font-medium text-[#718096] text-left ${
          pathname.includes('/admin/departments') && 'bg-slate-300 text-black'
        } px-4 py-1 rounded flex items-center group`}
      >
        <Building className="mr-2 text-[#718096] group-hover:text-black transition-colors duration-200" />
        <a href="/admin/departments" className="hover:text-black p-2">
          Departments
        </a>
      </li>
      <li
        className={`text-sm font-medium text-[#718096] text-left ${
          pathname.includes('/admin/pets') && 'bg-slate-300 text-black'
        } px-4 py-1 rounded flex items-center group`}
      >
        <Dog className="mr-2 text-[#718096] group-hover:text-black transition-colors duration-200" />
        <a href="/admin/pets" className="hover:text-black p-2">
          Pets
        </a>
      </li>
      <li
        className={`text-sm font-medium text-[#718096] text-left ${
          pathname.includes('/admin/specializations') &&
          'bg-slate-300 text-black'
        } px-4 py-1 rounded flex items-center group`}
      >
        <BriefcaseMedical className="mr-2 text-[#718096] group-hover:text-black transition-colors duration-200" />
        <a href="/admin/specializations" className="hover:text-black p-2">
          Specializations
        </a>
      </li>
      <li
        className={`text-sm font-medium text-[#718096] text-left ${
          pathname.includes('/admin/users') && 'bg-slate-300 text-black'
        } px-4 py-1 rounded flex items-center group`}
      >
        <User className="mr-2 text-[#718096] group-hover:text-black transition-colors duration-200" />
        <a href="/admin/users" className="hover:text-black p-2">
          Users
        </a>
      </li>
    </ul>
  );
};

export default SideBar;
