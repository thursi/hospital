"use client";
import ActionMenu from "@/components/AdminPanelComponents/ActionMenu";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import DefaultImage from "../../../../public/default_user.png";
import { archiveMedicine } from "./action";

export type Columns = {
  id: string;
  name: string;
  description: string;
  image: string;
  preSignedUrl: string | undefined;
  duration: number;
  createdDate: string;
  active: boolean;
  updatedDate: string;
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
      <div className="flex items-center space-x-3">
        {/* <Image
          alt="default image"
          src={DefaultImage}
          className="w-10 h-10 object-cover rounded-full border-2"
        /> */}
        <div className="font-bold text-start pl-12">Full Name</div>
      </div>
    ),
    cell: ({ row }) => (
      <div className="justify-center py-0">
        <div className="flex items-center gap-3 justify-start">
          <div className="w-10 h-10 object-contain">
            {row?.original?.preSignedUrl ? (
              <Image
                alt="medicine image"
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
            <div className="font-semibold text-sm">{row.original.name}</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "CreatedAt",
    header: () => <div className="font-bold text-start">Created At</div>,
    cell: ({ row }) => (
      <div className="text-start">{row.original.createdDate}</div>
    ),
  },
  {
    accessorKey: "UpdatedAt",
    header: () => <div className="font-bold text-start">Updated At</div>,
    cell: ({ row }) => (
      <div className="text-start">{row.original.updatedDate}</div>
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
          delete={() => archiveMedicine(row.original.id)}
          pathName={`/admin/medicines/${row.original.id}`}
          view={true}
          edit={true}
          data={row.original}
          component={"medicine"}
        />
      </div>
    ),
    header: () => <div className="text-center font-bold">Actions</div>,
  },
];
