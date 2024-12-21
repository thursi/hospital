"use client";

import { Appointment } from "@/lib/typings";
import { DataTable } from "../data-table";
import { doctorColumns } from "../../../app/admin/appointments/columns";
import { petsColumns } from "@/app/admin/pets/columns";


interface Props {
petResponse: any[];
}

const DoctorPets = (props: Props) => {
  console.log(props);
  return (
    <div className="p-3 flex flex-col">
      {<DataTable columns={petsColumns} data={props?.petResponse} pageSize={5} />}
    </div>
  );
};

export default DoctorPets;
