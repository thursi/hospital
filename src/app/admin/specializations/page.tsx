"use client";
import { getDepartmentData } from "@/app/home/action";
import { DataTable } from "@/components/AdminPanelComponents/data-table";
import SpecializationCreate from "@/components/AdminPanelComponents/SpecializationComponents/SpecializationCreate";
import { useDepartmentStore } from "@/store/departmentStore";
import { useSpecializationStore } from "@/store/specializationStore";
import { useEffect, useState } from "react";
import { getAllSpecializationData, getSpecializationData } from "./action";
import { columns } from "./columns";
import { BriefcaseMedical, FilterIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Index() {
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [selectedSelectedSpecializations, setSelectedSpecializationst] =
    useState<any | undefined>(null);
  const [
    specializations,
    setAllSpecializations,
    filterspecializations,
    setAllFilterSpecializations,
  ] = useSpecializationStore((state: any) => [
    state.specializations,
    state.setAllSpecializations,
    state.filterspecializations,
    state.setAllFilterSpecializations,
  ]);
  const [department, setAllDepartment] = useDepartmentStore((state: any) => [
    state.department,
    state.setAllDepartment,
  ]);
  const [specializationRecords, setspecializationRecords] =
    useState<any>(undefined);
  const [filterParams, setFilterParams] = useState({
    pageSize: 10,
    pageCount: 1,
  });

  async function fetchData() {
    const data = await getSpecializationData(
      filterParams.pageCount,
      filterParams.pageSize,
      selectedSelectedSpecializations
    );
    const departments = await getDepartmentData();
    const Specialization = await getAllSpecializationData();

    setAllFilterSpecializations(data);
    setAllSpecializations(Specialization);
    setAllDepartment(departments);
    setspecializationRecords(data);
  }

  useEffect(() => {
    fetchData();
  }, [selectedSelectedSpecializations, filterParams]);

  return (
    <div className="container flex flex-col gap-4 mx-auto py-5 relative">
      <div className="flex items-center">
        <BriefcaseMedical className="mr-2 text-black font-bold  group-hover:text-black transition-colors duration-200" />
        <div className="font-bold text-2xl">Specializations</div>
      </div>
      <div
        className="flex items-center justify-end p-3 cursor-pointer"
        onClick={() => setIsFiltersOpen((prev: boolean) => !prev)}
      >
        <FilterIcon className="h-6 w-6 text-[#8D9FBD] " />
        <div className="font-semibold text-[#8D9FBD] ml-2">Filters</div>
      </div>
      {isFiltersOpen && (
        <div className="flex gap-4 items-center">
          {/* Specialization Dropdown */}
          <div className="flex-1">
            <Select
              onValueChange={(value) => setSelectedSpecializationst(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Specialization" />
              </SelectTrigger>
              <SelectContent>
                {specializations.length > 0 ? (
                  specializations.map((item: any) => (
                    <SelectItem
                      key={item.id}
                      value={String(item.specializationName)}
                    >
                      {item.specializationName}
                    </SelectItem>
                  ))
                ) : (
                  <div className="px-3 font-semibold text-gray-400 text-center">
                    No options
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      <div className="self-end">
        <SpecializationCreate department={department} />
      </div>{" "}
      {/* <Filteration getApi={fetchData} /> */}
      <DataTable
        columns={columns}
        data={filterspecializations?.records}
        records={filterspecializations}
        pageSize={filterspecializations?.pageSize}
        handleFilter={(pageNumber, pageSize) => {
          setFilterParams((prevParams) => ({
            ...prevParams,
            pageCount: pageNumber,
            pageSize: pageSize,
          }));
        }}
      />
    </div>
  );
}
