"use client";
import ActionMenu from "@/components/AdminPanelComponents/ActionMenu";
import { ColumnDef } from "@tanstack/react-table";

export type Columns = {
  id: string;
  bookingDate: string;
  time: string;
  bookingType: string;
  status: string;
  userResponse: {
    firstName: string;
    lastName: string;
  };
  doctorResponse: {
    name: string;
  };
  medicineResponse: {
    name: string;
  };
};

export const doctorColumns: ColumnDef<Columns>[] = [
  {
    accessorKey: "number",
    header: () => <div className="font-bold text-center">#</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.index + 1}</div> // row.index starts from 0, so add 1
    ),
    id: "number", // Use a unique ID for this column
  },
  {
    accessorKey: "BookingDate",
    header: () => <div className="font-bold text-center">Booking Date</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.bookingDate}</div>
    ),
  },
  {
    accessorKey: "BookingTime",
    header: () => <div className="font-bold text-center">Booking Time</div>,
    cell: ({ row }) => <div className="text-center">{row.original.time}</div>,
  },
  {
    accessorKey: "UserName",
    header: () => <div className="font-bold text-center">User Name</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.userResponse.firstName +
          " " +
          row.original.userResponse.lastName}
      </div>
    ),
  },
  {
    accessorKey: "DoctorName",
    header: () => <div className="font-bold text-center">Doctor Name</div>,
    cell: ({ row }) => {
      const doctor = row.original.doctorResponse;
      return <div className="text-center">{doctor ? doctor.name : "N/A"}</div>;
    },
  },
  {
    accessorKey: "BookingStatus",
    header: () => <div className="font-bold text-center">Booking Status</div>,
    cell: ({ row }) => {
      const status = row.original.status;

      // Define badge styles based on status
      let badgeStyle = "";
      switch (status) {
        case "COMPLETED":
          badgeStyle = "bg-green-400 text-white";
          break;
        case "CANCELED":
          badgeStyle = "bg-red-400 text-white";
          break;
        case "CONFIRMED":
          badgeStyle = "bg-blue-400 text-black";
          break;
        default:
          badgeStyle = "bg-gray-400 text-white"; // default case
      }

      return (
        <div className={`text-center py-1 px-3 rounded-full ${badgeStyle}`}>
          {status}
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => (
      <div className="text-center flex justify-center">
        <ActionMenu
          pathName={`/admin/appointments/${row.original.id}`}
          view={true}
        />
      </div>
    ),
    header: () => <div className="text-center font-bold">Actions</div>,
  },
];

export const medicinesColumns: ColumnDef<Columns>[] = [
  {
    accessorKey: "number",
    header: () => <div className="font-bold text-center">#</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.index + 1}</div> // row.index starts from 0, so add 1
    ),
    id: "number", // Use a unique ID for this column
  },
  {
    accessorKey: "BookingDate",
    header: () => <div className="font-bold text-center">Booking Date</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.bookingDate}</div>
    ),
  },
  {
    accessorKey: "BookingTime",
    header: () => <div className="font-bold text-center">Booking Time</div>,
    cell: ({ row }) => <div className="text-center">{row.original.time}</div>,
  },
  {
    accessorKey: "UserName",
    header: () => <div className="font-bold text-center">User Name</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.userResponse.firstName +
          " " +
          row.original.userResponse.lastName}
      </div>
    ),
  },

  {
    accessorKey: "MedicineName",
    header: () => <div className="font-bold text-center">Medicine Name</div>,
    cell: ({ row }) => {
      const medicine = row.original.medicineResponse;
      return (
        <div className="text-center">{medicine ? medicine.name : "N/A"}</div>
      );
    },
  },

  {
    accessorKey: "BookingStatus",
    header: () => <div className="font-bold text-center">Booking Status</div>,
    cell: ({ row }) => {
      const status = row.original.status;

      // Define badge styles based on status
      let badgeStyle = "";
      switch (status) {
        case "COMPLETED":
          badgeStyle = "bg-green-400 text-white";
          break;
        case "CANCELED":
          badgeStyle = "bg-red-400 text-white";
          break;
        case "CONFIRMED":
          badgeStyle = "bg-blue-400 text-black";
          break;
        default:
          badgeStyle = "bg-gray-400 text-white"; // default case
      }

      return (
        <div className={`text-center py-1 px-3 rounded-full ${badgeStyle}`}>
          {status}
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => (
      <div className="text-center flex justify-center">
        <ActionMenu
          pathName={`/admin/appointments/${row.original.id}`}
          view={true}
        />
      </div>
    ),
    header: () => <div className="text-center font-bold">Actions</div>,
  },
];
