"use client";
import { DataTable } from "@/components/AdminPanelComponents/data-table";
import PetCreate from "@/components/AdminPanelComponents/PetComponents/PetCreate";
import { usePetStore } from "@/store/petStore";
import { useEffect, useState } from "react";
import { getAllFilterPets, getAllPets } from "./action";
import { petsColumns } from "./columns";
import { Dog, FilterIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Index() {
  const [pets, setAllPets, filterpets, setAllFilterPets] = usePetStore(
    (state: any) => [
      state.pets,
      state.setAllPets,
      state.filterpets,
      state.setAllFilterPets,
    ]
  );
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [selectedSelectedName, setSelectedName] = useState<any | undefined>(
    null
  );
  const [petRecords, setPetRecords] = useState<any>(undefined);
  const [filterParams, setFilterParams] = useState({
    pageSize: 10,
    pageCount: 1,
  });

  useEffect(() => {
    fetchData();
  }, [selectedSelectedName, filterParams]);

  async function fetchData() {
    const pets = await getAllPets();
    const data = await getAllFilterPets(
      filterParams.pageCount,
      filterParams.pageSize,
      selectedSelectedName
    );
    setAllPets(pets);
    setAllFilterPets(data);
    setPetRecords(data);
  }

  return (
    <div className="container flex flex-col gap-4 mx-auto py-5 relative">
      <div className="flex items-center">
        <Dog className="mr-2 text-black font-bold  group-hover:text-black transition-colors duration-200" />
        <div className="font-bold text-2xl">Pets</div>
      </div>
      <div
        className="flex items-center justify-end p-3 cursor-pointer"
        onClick={() => setIsFiltersOpen((prev: boolean) => !prev)}
      >
        <FilterIcon className="h-6 w-6 text-[#8D9FBD] " />
        <div className="font-semibold text-[#8D9FBD] ml-2">Filters</div>
      </div>
      <div>
        {isFiltersOpen && (
          <div className="flex gap-4 items-center">
            {/* Specialization Dropdown */}
            <div className="flex-1">
              <Select onValueChange={(value) => setSelectedName(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Pet" />
                </SelectTrigger>
                <SelectContent>
                  {pets.length > 0 ? (
                    pets.map((item: any) => (
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
          </div>
        )}
      </div>
      <div className="self-end">
        <PetCreate />
      </div>{" "}
      {/* <Filteration getApi={fetchData} /> */}
      <DataTable
        columns={petsColumns}
        data={filterpets.records}
        records={filterpets}
        pageSize={filterpets?.pageSize}
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
