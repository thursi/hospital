"use client";

import { DayPickerProvider, DayPickerProps } from "react-day-picker"; // Import DayPickerProvider and DayPickerProps
import { useEffect, useState } from "react";
import { DataTable } from "../../../components/AdminPanelComponents/data-table";
import { Button } from "react-day-picker"; // Assuming Button is from react-day-picker
import { useRouter } from "next/navigation";
import { Hospital, PlusIcon } from "lucide-react";
import { getHospitalFilterData, getHospitals } from "./action";
import { useHospitalStore } from "@/store/hospitalStore";
import { hospitalColumns } from "./columns";

export default function DemoPage() {
  const router = useRouter();
  const [hospitals, setAllHospitals] = useHospitalStore((state: any) => [
    state.hospitals,
    state.setAllHospitals,
  ]);
  const [hospitalRecords, sethospitalRecords] = useState<any>(undefined);
  const [filterParams, setFilterParams] = useState({
    pageSize: 10,
    pageCount: 1,
  });

  useEffect(() => {
    fetchData();
  }, [filterParams]);

  async function fetchData() {
    const hospitalRecords = await getHospitalFilterData(filterParams);
    sethospitalRecords(hospitalRecords);
    setAllHospitals(hospitalRecords);
  }

  const dayPickerProps: DayPickerProps = {
    mode: "single",
    required: false,
  };
console.log("hospitals?.recordshospitals?.records",hospitals?.records)
  return (
    <DayPickerProvider initialProps={dayPickerProps}>
      {" "}
      <div
        className="container flex flex-col gap-4 mx-auto py-5 relative"
        style={{
          overflow: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="flex items-center">
          <Hospital className="mr-2 text-black font-bold  group-hover:text-black transition-colors duration-200" />
          <div className="font-bold text-2xl">Hospitals</div>
        </div>

        {/* <div
          className="flex items-center justify-end p-3 cursor-pointer"
          onClick={() => setIsFiltersOpen((prev: boolean) => !prev)}
        >
          <FilterIcon className="h-6 w-6 text-[#8D9FBD] " />
          <div className="font-semibold text-[#8D9FBD] ml-2">Filters</div>
        </div> */}

        <div className="self-end">
          <Button
            className="bg-blue-600 text-white p-2 rounded-xl flex items-center"
            onClick={() => router.push("/admin/hospitals/hospitalcreate")}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            <span>Create</span>
          </Button>
        </div>
        <DataTable
          columns={hospitalColumns}
          data={hospitals?.records}
          records={hospitals}
          pageSize={hospitals?.pageSize}
          handleFilter={(pageNumber, pageSize) => {
            setFilterParams((prevParams) => ({
              ...prevParams,
              pageCount: pageNumber,
              pageSize: pageSize,
            }));
          }}
        />
      </div>
    </DayPickerProvider>
  );
}
