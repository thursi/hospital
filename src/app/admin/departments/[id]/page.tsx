"use client";

import EditIcon from "@/components/svg/edit_icon";
import { useDepartmentStore } from "@/store/departmentStore";
import Image from "next/image";
import { useEffect, useCallback } from "react";
import DefaultImage from "../../../../../public/default_user.png";
import { getDepartmentById } from "../action";

const Index = ({ params }: { params: { id: string } }) => {
  const [
    selectedDepartment,
    setSelectedDepartment,
    loading,
  ] = useDepartmentStore((state: any) => [
    state.selectedDepartment,
    state.setSelectedDepartment,
    state.loading,
  ]);

  const handleSelectDepartment = useCallback(async () => {
    const data = await getDepartmentById(params.id);
    setSelectedDepartment(data);
  }, [params.id, setSelectedDepartment]); // Include dependencies

  useEffect(() => {
    handleSelectDepartment();
  }, [handleSelectDepartment]); // Use handleSelectDepartment in the dependency array

  if (loading) {
    return <div>Loading...!</div>; // Ensure you return the loading state
  }

  return (
    <div className="flex flex-col px-3 bg-white py-5 h-full w-full rounded-lg">
      <div className="flex relative">
        <EditIcon className="absolute top-0 right-0 cursor-pointer" />
        <div className="relative">
          <EditIcon className="absolute top-5 right-5 z-10 cursor-pointer" />
          {selectedDepartment?.preSignedUrl ? (
            <Image
              src={selectedDepartment.preSignedUrl}
              alt="Department Image"
              width={200}
              height={200}
              className="rounded-full border-4 object-cover h-[200px] w-[200px]"
            />
          ) : (
            <Image
              src={DefaultImage}
              className="rounded-full border-4"
              alt="default_img"
              height={200}
              width={200}
            />
          )}
        </div>
        <div className="grow flex flex-col gap-2 px-3 py-2">
          <div className="font-bold text-2xl flex gap-2 items-center">
            {selectedDepartment?.name}{" "}
          </div>
          <div className="font-semibold text-xl">
            &quot;{selectedDepartment?.description}&quot;
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
