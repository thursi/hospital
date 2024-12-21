import { Doctor } from "@/lib/typings";
import DoctorCard from "./DoctorCard";

const AvailableDoctors = () => {
  const doctors = [
    {
      id: "string",
      firstName: "string",
      lastName: "string",
      email: "string",
      phoneNo: "string",
      dateOfBirth: "string",
      gender: "string",
      specializationId: "string",
      specializationName: "string",
      description: "string",
      departmentId: "string",
      departmentName: "string",
      image: "string",
      preSignedUrl: "string",
      duration: 2,
      dayTimeSlotResponses: [
        {
          day: "string",
          timeSlots: [{ startTime: "string", endTime: "string" }],
          appointmentTimes: ["", ""],
        },
      ],
    },
    {
      id: "string",
      firstName: "string",
      lastName: "string",
      email: "string",
      phoneNo: "string",
      dateOfBirth: "string",
      gender: "string",
      specializationId: "string",
      specializationName: "string",
      description: "string",
      departmentId: "string",
      departmentName: "string",
      image: "string",
      preSignedUrl: "string",
      duration: 2,
      dayTimeSlotResponses: [
        {
          day: "string",
          timeSlots: [{ startTime: "string", endTime: "string" }],
          appointmentTimes: ["", ""],
        },
      ],
    },
    {
      id: "string",
      firstName: "string",
      lastName: "string",
      email: "string",
      phoneNo: "string",
      dateOfBirth: "string",
      gender: "string",
      specializationId: "string",
      specializationName: "string",
      description: "string",
      departmentId: "string",
      departmentName: "string",
      image: "string",
      preSignedUrl: "string",
      duration: 2,
      dayTimeSlotResponses: [
        {
          day: "string",
          timeSlots: [{ startTime: "string", endTime: "string" }],
          appointmentTimes: ["", ""],
        },
      ],
    },
  ];
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="text-xl font-bold">Doctors on Duty</div>
      <div className="flex w-full overflow-x-auto gap-3">
        {doctors.length > 0 ? (
          doctors.map((doctor: any) => (
            <DoctorCard key={doctor?.id} doctor={doctor} />
          ))
        ) : (
          <div className="text-2xl self-center flex text-gray-600 justify-center items-center w-full font-bold h-32">
            No upcoming appointments!
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableDoctors;
