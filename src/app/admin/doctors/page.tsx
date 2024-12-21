"use client";
import { DayPickerProvider, DayPickerProps } from "react-day-picker"; // Import DayPickerProvider and DayPickerProps
import { useEffect, useState } from "react";
import { getAllPets, getAllSpecializations } from "@/api/route";
import { useAdminStore } from "@/store/adminStore";
import { usePetStore } from "@/store/petStore";
import { useSpecializationStore } from "@/store/specializationStore";
import { DataTable } from "../../../components/AdminPanelComponents/data-table";
import { getDoctorData } from "./action";
import { columns } from "./columns";
import { Button } from "react-day-picker"; // Assuming Button is from react-day-picker
import { usePathname, useRouter } from "next/navigation";
import { FilterIcon, PlusIcon, Stethoscope } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDepartmentStore } from "@/store/departmentStore";
import { getDepartmentData } from "../departments/action";
export default function DemoPage() {
  const router = useRouter();

  const [doctors, setAllDoctors, loading] = useAdminStore((state: any) => [
    state.doctors,
    state.setAllDoctors,
    state.loading,
  ]);
  const [specialization, setAllSpecialization] = useSpecializationStore(
    (state: any) => [state.specialization, state.setAllSpecialization]
  );
  const [pet, setAllPet] = usePetStore((state: any) => [
    state.pet,
    state.setAllPet,
  ]);
  const [departments, setAllDepartments] = useDepartmentStore((state: any) => [
    state.departments,
    state.setAllDepartments,
  ]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSpecialization, setSelectedSpecialization] = useState<
    any | undefined
  >(null);
  const [selectedPets, setSelectedPets] = useState<any | undefined>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<any | undefined>(
    null
  );
  const [filterParams, setFilterParams] = useState({
    pageSize: 10,
    pageCount: 1,
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [doctorRecords, setDoctorRecords] = useState<any>(undefined);

  useEffect(() => {
    fetchData();
    if (!isFiltersOpen) {
      setSelectedSpecialization(null);
      setSelectedPets(null);
      setSelectedDepartment(null);
      getDoctorData(1, 10, undefined, undefined, undefined);
    }
  }, [filterParams , selectedSpecialization | selectedDepartment | selectedPets]);

  async function fetchData() {
    const data = await getDoctorData(
      filterParams.pageCount,
      filterParams.pageSize,
      selectedSpecialization,
      selectedDepartment,
      selectedPets
    );
    const specializations = await getAllSpecializations();
    const department = await getDepartmentData(1, 10);
    const pets = await getAllPets();
    setDoctorRecords(data);
    setAllDoctors(data);
    setAllDepartments(department?.records);
    setAllSpecialization(specializations);
    setAllPet(pets);
  }

  // Define DayPickerProps for the DayPickerProvider
  const dayPickerProps: DayPickerProps = {
    mode: "single", // Can be "single", "multiple", etc., depending on usage
    required: false,
  };

  if (loading) {
    return <div>Loading...!</div>;
  }

  // useEffect(() => {
  //   if (!isFiltersOpen) {
  //     selectedSpecialization(undefined);
  //     selectedDepartment(undefined);
  //     selectedPets(undefined);
  //      getDoctorData(1, 10,undefined,undefined,undefined);
  //   }
  // }, [isFiltersOpen]);

  return (
    <DayPickerProvider initialProps={dayPickerProps}>
      {" "}
      {/* Provide initialProps */}
      <div
        className="container flex flex-col gap-4 mx-auto py-5 relative"
        style={{
          overflow: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="flex items-center">
          <Stethoscope className="mr-2 text-black font-bold  group-hover:text-black transition-colors duration-200" />
          <div className="font-bold text-2xl">Doctors</div>
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
              <Select onValueChange={setSelectedSpecialization}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select specialization" />
                </SelectTrigger>
                <SelectContent>
                  {specialization.length > 0 ? (
                    specialization.map((item: any) => (
                      <SelectItem key={item.id} value={String(item.id)}>
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
            <div className="flex-1">
              <Select onValueChange={setSelectedPets}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select pet" />
                </SelectTrigger>
                <SelectContent>
                  {pet.length > 0 ? (
                    pet.map((item: any) => (
                      <SelectItem key={item.id} value={String(item.id)}>
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
            <div className="flex-1">
              <Select onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.length > 0 ? (
                    departments.map((item: any) => (
                      <SelectItem key={item.id} value={String(item.id)}>
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

        <div className="self-end">
          <Button
            className="bg-blue-600 text-white p-2 rounded-xl flex items-center"
            onClick={() => router.push("/admin/doctors/doctorcreate")}
          >
            <PlusIcon className="mr-2 h-4 w-4" /> {/* The PlusIcon */}
            <span>Create</span>
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={doctors?.records}
          records={doctors}
          pageSize={doctors?.pageSize}
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

// "use client";
// import { useEffect, useState } from "react";
// import { getAllPets, getAllSpecializations } from "@/api/route";
// import { useAdminStore } from "@/store/adminStore";
// import { usePetStore } from "@/store/petStore";
// import { useSpecializationStore } from "@/store/specializationStore";
// import { DataTable } from "../../../components/AdminPanelComponents/data-table";
// import { getDoctorData } from "./action";
// import { columns } from "./columns";
// import { Button } from "react-day-picker";
// import DocCreateForm from "../../../components/AdminPanelComponents/DoctorComponents/DocCreateForm";

// export default function DemoPage() {
//   const [doctors, setAllDoctors] = useAdminStore((state: any) => [
//     state.doctors,
//     state.setAllDoctors,
//   ]);
//   const [specialization, setAllSpecialization] = useSpecializationStore(
//     (state: any) => [state.specialization, state.setAllSpecialization]
//   );
//   const [pet, setAllPet] = usePetStore(
//     (state: any) => [state.pet, state.setAllPet]
//   );

//   const [isFormOpen, setIsFormOpen] = useState(false);

//   async function fetchData() {
//     const data = await getDoctorData(1, 10);
//     const specializations = await getAllSpecializations();
//     const pets = await getAllPets();
//     setAllDoctors(data?.records);
//     setAllSpecialization(specializations);
//     setAllPet(pets);
//   }

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className="container flex flex-col gap-4 mx-auto py-5 relative">
//       <div className="self-end">
//         <Button className="bg-red-500" onClick={() => setIsFormOpen(true)}>
//           Create
//         </Button>
//       </div>

//       {isFormOpen && (
//         <DocCreateForm
//           specialization={specialization}
//           pet={pet}
//           setOpen={setIsFormOpen}
//         />
//       )}

//       <DataTable columns={columns} data={doctors} />
//     </div>
//   );
// }
