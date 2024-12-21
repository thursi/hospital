"use client";
import ActionMenu from "@/components/AdminPanelComponents/ActionMenu";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import DefaultImage from "../../../../public/default_user.png";
import { archiveUserById } from "./action";

export type Columns = {
  id: string;
  firstName: string;
  lastName: string;
  description: string;
  city:string;
  active: boolean;
  role: string;
  image: string;
  email: string;
  phoneNo: string;
  preSignedUrl: string | undefined;
  createdDate: string;
  updatedDate: string;
};

export const columns: ColumnDef<Columns>[] = [

  {
    accessorKey: "UserName",
    header: () => (
      <div className="flex items-center space-x-3">
        {/* <Image
          alt="default image"
          src={DefaultImage}
          className="w-10 h-10 object-cover rounded-full border-2"
        /> */}
        <div className="font-bold text-start pl-12">User Name</div>
      </div>
    ),
    cell: ({ row }) => (
      <div className="justify-center py-0">
        <div className="flex items-center gap-3 justify-start">
          <div className="w-10 h-10 object-contain">
            {row?.original?.preSignedUrl ? (
              <Image
                alt="user image"
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
              {row.original.firstName +" "+ row.original.lastName}
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
    accessorKey: "City",
    header: () => <div className="font-bold text-start">City</div>,
    cell: ({ row }) => (
      <div className="text-start">{row.original.city}</div>
    ),
  },
  {
    accessorKey: "PhoneNumber",
    header: () => <div className="font-bold text-start">Phone Number</div>,
    cell: ({ row }) => (
      <div className="text-start">{row.original.phoneNo}</div>
    ),
  },
  {
    accessorKey: "Role",
    header: () => <div className="font-bold text-start">Role</div>,
    cell: ({ row }) => (
      <div className="text-start">{row.original.role}</div>
    ),
  },

  {
    accessorKey: "Active",
    header: () => <div className="font-bold text-start">Active</div>,
    cell: ({ row }) => (
      <div className="text-start">
        <span
          className={`px-2 py-1 rounded-full text-white ${
            row.original.active ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {row.original.active ? "Active" : "Archive"}
        </span>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="text-start flex justify-center">
        <ActionMenu
          delete={() => archiveUserById(row.original.id)}
          pathName={`/admin/users/${row.original.id}`}
          view={true}
        />
      </div>
    ),
    header: () => <div className="text-center font-bold">Actions</div>,
  },
];
