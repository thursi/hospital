"use client";
import { getAllSpecializations } from "@/api/route";
import { DataTable } from "@/components/AdminPanelComponents/data-table";
import MedicineCreate from "@/components/AdminPanelComponents/MedicineComponents/MedicineCreate";
import { useMedicineStore } from "@/store/medicinesStore";
import { useSpecializationStore } from "@/store/specializationStore";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { CalendarIcon, FilterIcon, Syringe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { getAllMedicinesData, getMedicineData } from "./action";
import { Value } from "@radix-ui/react-select";
export default function Index() {
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<any | null>(null);
  const [isCalendarOpen, setCalendarOpen] = useState(false);

  const [selectedSelectedMedicines, setSelectedMedicines] = useState<
    any | undefined
  >(null);
  const [medicines, setAllMedicines, filterMedicines, setFilterMedicines] =
    useMedicineStore((state: any) => [
      state.medicines,
      state.setAllMedicines,
      state.filterMedicines,
      state.setFilterMedicines,
    ]);
  const [specialization, setAllSpecialization] = useSpecializationStore(
    (state: any) => [state.specialization, state.setAllSpecialization]
  );

  const [filterParams, setFilterParams] = useState({
    pageSize: 10,
    pageCount: 1,
  });

  useEffect(() => {
    if (!isFiltersOpen) {
      setSelectedMedicines(undefined);
    }
    fetchData();
  }, [selectedSelectedMedicines, filterParams]);

  async function fetchData() {
    const medicinesData = await getAllMedicinesData();

    const data = await getMedicineData(
      filterParams.pageCount,
      filterParams.pageSize,
      selectedSelectedMedicines
      // selectedDate
    );
    setFilterMedicines(data);

    setAllMedicines(medicinesData);
  }

  return (
    <div className="container flex flex-col gap-4 mx-auto py-5 relative">
      <div className="flex items-center">
        <Syringe className="mr-2 text-black font-bold  group-hover:text-black transition-colors duration-200" />
        <div className="font-bold text-2xl">Vaccination</div>
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
            <Select onValueChange={(value) => setSelectedMedicines(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Medicines" />
              </SelectTrigger>
              <SelectContent>
                {medicines.length > 0 ? (
                  medicines.map((item: any) => (
                    <SelectItem key={item.id} value={String(item.name)}>
                      {item.name}
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
          {/* <div className="flex-1">
            <Popover
              open={isCalendarOpen}
              onOpenChange={setCalendarOpen} // Toggle the popover open/close state
            >
              <PopoverTrigger className="w-full" asChild>
                <Button
                  variant={'outline'}
                  className="w-full pl-3 text-left font-normal"
                >
                  {selectedDate ? (
                    format(selectedDate, 'PPP') 
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    setCalendarOpen(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div> */}
        </div>
      )}
      <div className="self-end">
        <MedicineCreate />
      </div>
      <DataTable
        columns={columns}
        data={filterMedicines?.records}
        records={filterMedicines}
        pageSize={filterMedicines?.pageSize}
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
