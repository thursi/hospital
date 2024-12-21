"use client";

import ActionMenu from "@/components/AdminPanelComponents/ActionMenu";
import { ColumnDef } from "@tanstack/react-table";
import { archiveHospitalById } from "./action";

export type HospitalData = {
  id: string;
  name: string;
  city: string;
  phoneNumber: string;
  closeTime: string;
  openTime: string;
  doctorDepartmentResponses: {
    departmentResponse: {
      id: number;
      name: string;
      description: string;
      image: string;
      active: boolean;
    };
    doctorResponses: {
      id: number;
      name: string;
      email: string;
      phoneNo: string;
      specializationName: string;
      description: string;
      isActive: boolean;
    }[];
  }[];
  medicineResponses: {
    name: string;
  }[];
  active:boolean;
};

export const hospitalColumns: ColumnDef<HospitalData>[] = [
  {
    accessorKey: "name",
    header: () => <div className="font-bold text-left">Name</div>,
    cell: ({ row }) => <div className="text-left">{row.original.name}</div>,
  },
  {
    accessorKey: "city",
    header: () => <div className="font-bold text-left">City</div>,
    cell: ({ row }) => <div className="text-left">{row.original.city}</div>,
  },
  {
    accessorKey: "phoneNumber",
    header: () => <div className="font-bold text-left">Contact</div>,
    cell: ({ row }) => (
      <div className="text-left">{row.original.phoneNumber}</div>
    ),
  },
  {
    accessorKey: "openTime",
    header: () => <div className="font-bold text-left">Open Time</div>,
    cell: ({ row }) => (
      <div className="text-left">{row.original.openTime}</div>
    ),
  },
  {
    accessorKey: "closeTime",
    header: () => <div className="font-bold text-left">Close Time</div>,
    cell: ({ row }) => (
      <div className="text-left">{row.original.closeTime}</div>
    ),
  },
  // {
  //   accessorKey: "doctorDepartmentResponses",
  //   header: () => <div className="font-bold text-left">Departments</div>,
  //   cell: ({ row }) => (
  //     <div className="text-left">
  //       {(row.original?.doctorDepartmentResponses ?? [])
  //         .map((ddr) => ddr.departmentResponse.name)
  //         .join(", ")}
  //     </div>
  //   ),
  // },
  // {
  //   accessorKey: "doctorResponses",
  //   header: () => <div className="font-bold text-left">Doctors</div>,
  //   cell: ({ row }) => (
  //     <div className="text-left flex flex-wrap gap-2">
  //       {(row.original?.doctorDepartmentResponses ?? [])
  //         .flatMap((ddr) => ddr.doctorResponses)
  //         .map((doc, index) => (
  //           <span
  //             key={index}
  //             className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg"
  //           >
  //             {doc.name}
  //           </span>
  //         ))}
  //     </div>
  //   ),
  // },
  // {
  //   accessorKey: "medicineResponses",
  //   header: () => <div className="font-bold text-left">Medicines</div>,
  //   cell: ({ row }) => (
  //     <div className="text-left flex flex-wrap gap-2">
  //       {(row.original?.medicineResponses ?? []).map((med, index) => (
  //         <span
  //           key={index}
  //           className="bg-green-100 text-green-800 px-2 py-1 rounded-lg"
  //         >
  //           {med.name}
  //         </span>
  //       ))}
  //     </div>
  //   ),
  // },
  {
    accessorKey: "active",
    header: () => <div className="font-bold text-center">Active</div>,
    cell: ({ row }) => {
      const active = row.original.active;
  
      // Define badge styles based on active status
      const badgeStyle = active ? "bg-green-500 text-white" : "bg-red-500 text-white";
  
      return (
        <div className="text-center py-1 px-3 rounded-full">
          <span className={`px-2 py-1 rounded-full ${badgeStyle}`}>
            {active ? "Active" : "Archive"}
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
          // pathName={`/admin/doctors/${row.original.id}`}
          // pathName={`/admin/hospitals/${row.original.id}`}
          delete={() => archiveHospitalById(row.original.id)}
          view={true}
          edit={true}
          component={""}
          //  navigateTo={`/admin/hospitals/hospitaledit?id=${row.original.id}`}
          navigateTo={`/admin/hospitals/hospitaledit/${row.original.id}`}
 
           pathName={`/admin/hospitals/${row.original.id}`}

        
        
        />
      </div>
    ),
    header: () => <div className="text-center font-bold">Actions</div>,
  },
];
