// "use client";
// import DaySlot from "@/components/shared/day-slot";
// import GenderIcon from "@/components/svg/gender-icon";
// import { Button } from "@/components/ui/button";
// import { useDoctorStore } from "@/store/doctorStore";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import DefaultImage from "../../../../../public/default_user.png";
// import { getDoctorById } from "./action";

// const Index = ({ params }: { params: { id: string } }) => {
//   const router = useRouter();
//   const [dloading, setdLoading] = useState<boolean>(true);
//   const [
//     selectedDoctor,
//     setSelectedDoctor,
//     loading,
//     doctorAppointments,
//     setDoctorAppointments,
//   ] = useDoctorStore((state: any) => [
//     state.selectedDoctor,
//     state.setSelectedDoctor,
//     state.loading,
//     state.doctorAppointments,
//     state.setDoctorAppointments,
//   ]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getDoctorById(params.id);
//         setSelectedDoctor(response);
//       } catch (error) {
//         console.error("Failed to fetch doctor data:", error);
//       } finally {
//         setdLoading(false);
//       }
//     };

//     fetchData();
//   }, [params.id, setSelectedDoctor]); // Include setSelectedDoctor in the dependency array

//   if (dloading && !selectedDoctor) {
//     return (
//       <div className="mt-14 px-7 w-full flex flex-col bg-gray-100 items-center py-4">
//         <div className="w-full max-w-[1204px] flex flex-col px-3 py-5 h-full rounded-lg">
//           Loading...!
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div className="mt-14 px-7 w-full flex flex-col items-center py-4">
//       <div className="w-full flex flex-col max-w-[1204px] gap-y-3">
//         <div className="w-full flex flex-col px-3 bg-white py-5 h-full rounded-lg">
//           <div className="w-full flex flex-col items-center md:flex-row md:justify-start relative">
//             <div className="relative">
//               {selectedDoctor?.preSignedUrl ? (
//                 <Image
//                   src={selectedDoctor?.preSignedUrl}
//                   alt="Doctor Image"
//                   width={200}
//                   height={200}
//                   className="rounded-full border-4 object-cover h-[200px] w-[200px]"
//                 />
//               ) : (
//                 <Image
//                   src={DefaultImage}
//                   className="rounded-full border-4"
//                   alt="default_img"
//                   height={200}
//                   width={200}
//                 />
//               )}
//             </div>
//             <div className="grow w-1/2 min-w-fit items-center md:items-start flex flex-col gap-2 px-3 py-2">
//               <div className="font-bold text-2xl flex gap-2 items-center">
//                 {selectedDoctor?.name}{" "}
//                 <GenderIcon gender={selectedDoctor?.gender} className="w-6 h-6" />
//               </div>
//               <div>
//                 <div className="font-semibold mb-1">
//                   {selectedDoctor?.specializationName}
//                 </div>
//                 <div className="font-semibold mb-2">
//                   {selectedDoctor?.departmentName}
//                 </div>
//               </div>
//               <div className="flex flex-col items-start">
//                 <div className="font-semibold text-xl">{selectedDoctor?.email}</div>
//                 <div className="font-semibold text-xl">{selectedDoctor?.phoneNo}</div>
//                 <div className="font-semibold text-xl">&quot;{selectedDoctor?.description}&quot;</div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="w-full flex flex-col px-3 bg-white py-5 rounded-lg">
//           <DaySlot daySlots={selectedDoctor?.dayTimeSlotResponses} />
//         </div>
//         <div className="w-full relative flex md:justify-end">
//           <Button
//             onClick={() => {
//               router.push(`/appointmentdoctor?doctorId=${selectedDoctor?.id}`);
//             }}
//             className="w-full md:w-fit md:px-3"
//           >
//             Book for Appointment
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Index;



'use client';
import { getDoctorById } from '@/app/(signedin)/doctor-details/[id]/action';
import DoctorDetails from '@/components/DoctorComponent/DoctorDetails';
// import DoctorDetails from '@/components/DoctorComponent/DoctorDetails';
import { useDoctorStore } from '@/store/doctorStore';
import { useEffect } from 'react';

const Index = ({ params }: { params: { id: string } }) => {
  const [
    selectedDoctor,
    setSelectedDoctor,
    loading,
    setdLoading,
    doctorAppointments,
    setDoctorAppointments,
  ] = useDoctorStore((state: any) => [
    state.selectedDoctor,
    state.setSelectedDoctor,
    state.loading,
    state.setdLoading,
    state.doctorAppointments,
    state.setDoctorAppointments,
  ]);

  async function fetchData() {
    const response = await getDoctorById(params.id);
    setSelectedDoctor(response);
    setdLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [params.id]);

  return (
    <div className="container mt-16 mx-auto my-8">
      {loading ? (
        <div>Loading...</div>
      ) : selectedDoctor ? (
        <DoctorDetails doctor={selectedDoctor} />
      ) : (
        <div>Doctor not found.</div>
      )}
    </div>
  );
};

export default Index;
