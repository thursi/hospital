"use client";
import ActionMenu from "@/components/AdminPanelComponents/ActionMenu";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import DefaultImage from "../../../../public/default_user.png";
import { archiveDoctorById } from "./action";

export type Columns = {
  id: string;
  name: string;
  email: string;
  phoneNo: string;
  dateOfBirth: string;
  gender: string;
  specializationId: string;
  departmentName: string;
  specializationName: string;
  description: string;
  image: string;
  isActive: boolean;
  preSignedUrl: string | undefined;
  duration: number;
  departmentResponse:{
    id:number;
    name: string;
  },
  dayTimeSlotResponses: {
    day: string;
    timeSlots: { startTime: string; endTime: string }[];
    appointmentTimes: string[];
  }[];
};

export const columns: ColumnDef<Columns>[] = [
  {
    accessorKey: "fullName",
    header: () => (
      <div className="flex">
        {/* <Image
          alt="default image"
          src={DefaultImage}
          className="w-10 h-10 object-cover rounded-full border-2"
        /> */}
        
        <div className="font-bold pl-14">Full Name</div>
      </div>
    ),
    cell: ({ row }) => (
      <div className="justify-center py-0">
        <div className="flex items-center gap-3 justify-start">
          <div className="w-10 h-10 object-contain">
            {row?.original?.preSignedUrl ? (
              <Image
                alt="doctor image"
                src={row?.original?.preSignedUrl}
                className="w-10 h-10 object-cover rounded-full border-2"
                height={200}
                width={200}
              />
            ) : (
              <Image
                alt="default image"
                src={DefaultImage}
                className="w-10 h-10 object-cover rounded-full border-2"
              />
            )}
          </div>
          <div className="flex flex-col">
            <div className="font-semibold text-sm">
              {row.original.name}
            </div>
            <div className="font-semibold text-[12px]">
              {row?.original?.email}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "phoneNo",
    header: () => <div className="font-bold text-start">Phone Number</div>,
    cell: ({ row }) => (
      <div className="text-s">{row.original.phoneNo}</div>
    ),
  },
  {
    accessorKey: "specializationName",
    header: () => <div className="font-bold text-start">Specialization</div>,
    cell: ({ row }) => (
      <div className="text-start">{row.original.specializationName}</div>
    ),
  },
  {
    accessorKey: "departmentName",
    header: () => <div className="font-bold text-start">Department Name</div>,
    cell: ({ row }) => (
      <div className="text-start">{row.original?.departmentResponse?.name}</div>
    ),
  },
  {
    accessorKey: "Active",
    header: () => <div className="font-bold text-center">Active</div>,
    cell: ({ row }) => {
      const isActive = row.original.isActive;
  
      // Define badge styles based on active status
      const badgeStyle = isActive ? "bg-green-500 text-white" : "bg-red-500 text-white";
  
      return (
        <div className="text-center py-1 px-3 rounded-full">
          <span className={`px-2 py-1 rounded-full ${badgeStyle}`}>
            {isActive ? "Active" : "Archive"}
          </span>
        </div>
      );
    },
  },
  
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="text-start flex justify-center">
        <ActionMenu 
        pathName={`/admin/doctors/${row.original.id}`}
        delete={() => archiveDoctorById(row.original.id)}
        navigateTo={`/admin/doctors/doctoredit/${row.original.id}`}
        view={true}
        edit={true} />
      </div>
    ),
    header: () => <div className="text-center font-bold">Actions</div>,
  },
];
