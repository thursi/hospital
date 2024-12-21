"use client";

import { getDepartmentById } from "@/app/admin/departments/action";
import { getDoctorData } from "@/app/admin/doctors/action";
import PopularDoctors from "@/components/Image";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

const Index = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [doctors, setDoctors] = useState<any>([]);
  const [department, setDepartment] = useState<any>(undefined);
  const [dloading, setdLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    setdLoading(true); // Optional: Start loading before fetching data
    const response = await getDoctorData(1, 10, undefined, params.id);
    const dep = await getDepartmentById(params.id);
    setDepartment(dep);
    setDoctors(response?.records);
    setdLoading(false);
  }, [params.id]); // Add dependencies
  const handleClick = (imageName: any) => {
    console.log(`${imageName} clicked!`);
  };

  const doctores = Array.isArray(doctors)
    ? doctors.map((doctor: any) => ({
        id: doctor.id,
        src: doctor.preSignedUrl,
        alt: doctor.image,
        textOverlay: doctor.name,
        description: doctor.description,
        specializationName: doctor.specializationName,
        dayTimeSlotResponses: doctor.dayTimeSlotResponses,
      }))
    : [];
  useEffect(() => {
    fetchData();
  }, [fetchData]); // Use the memoized function

  if (dloading && !department) {
    return (
      <div className="mt-14 px-7 w-full h-full flex flex-col bg-gray-100 items-center py-4">
        <div className="w-full max-w-[1204px] justify-center items-center flex flex-col px-3 py-5 h-full rounded-lg">
          <Loader className="h-10 w-10" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="mt-14 px-0 md:px-7 w-full flex flex-col items-center py-4">
      <div className="w-full flex flex-col max-w-[1204px] gap-y-3">
        <PopularDoctors
          title={`${department?.name}`}
          description="Meet With Professional Doctors."
          //   link="/doctors"
          handleClick={handleClick}
          linkDescription="Doctors"
          doctors={doctors}
          pathname={"/appointmentdoctor"}
          query={doctores}
          doctor={true}
        />
      </div>
    </div>
  );
};

export default Index;
