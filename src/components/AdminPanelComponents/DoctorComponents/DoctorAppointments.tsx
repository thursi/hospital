"use client";

import { Appointment } from "@/lib/typings";
import { DataTable } from "../data-table";
import { doctorColumns } from "../../../app/admin/appointments/columns";

interface Props {
  appointments: any[];
  doctorAppointmentRecords?: any;
  handleFilter?: (pageNumber: number, pageSize: number) => void;
}

const DoctorAppointments = (props: Props) => {
  const pagesize = props?.doctorAppointmentRecords?.pageSize;
  return (
    <div className="p-3 flex flex-col">
      {
        <DataTable
          columns={doctorColumns}
          data={props?.appointments}
          records={props.doctorAppointmentRecords}
          pageSize={pagesize}
          handleFilter={(pageNumber, pageSize) => {props.handleFilter?.(pageNumber, pageSize)}}
        />
      }
    </div>
  );
};

export default DoctorAppointments;
