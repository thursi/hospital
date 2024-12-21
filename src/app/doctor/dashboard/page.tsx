import AppointmentCard from "@/components/AppointmentCard";
import EditIcon from "@/components/svg/edit_icon";
import { Appointment } from "@/lib/typings";
import Image from "next/image";
import DoctorImage from "../../../../public/doctor.png";

const Index = () => {
  const appointments = [
    {
      id: "string",
      bookingDate: "string",
      time: "string",
      doctorResponse: {
        id: "string",
        name: "string",
        email: "string",
        phoneNo: "string",
        dateOfBirth: "string",
        gender: "string",
      },
      medicineResponse: {
        id: "string",
        name: "string",
      },
      description: "string",
      status: "string",
      bookingType: "string",
      userResponse: {
        id: "string",
        firstName: "string",
        lastName: "string",
        email: "string",
        phoneNo: "string",
        dateOfBirth: "string",
        gender: "string",
      },
    },
    {
      id: "string",
      bookingDate: "string",
      time: "string",
      doctorResponse: {
        id: "string",
        name: "string",
        email: "string",
        phoneNo: "string",
        dateOfBirth: "string",
        gender: "string",
      },
      medicineResponse: {
        id: "string",
        name: "string",
      },
      description: "string",
      status: "string",
      bookingType: "string",
      userResponse: {
        id: "string",
        firstName: "string",
        lastName: "string",
        email: "string",
        phoneNo: "string",
        dateOfBirth: "string",
        gender: "string",
      },
    },
    {
      id: "string",
      bookingDate: "string",
      time: "string",
      doctorResponse: {
        id: "string",
        name: "string",
        email: "string",
        phoneNo: "string",
        dateOfBirth: "string",
        gender: "string",
      },
      medicineResponse: {
        id: "string",
        name: "string",
      },
      description: "string",
      status: "string",
      bookingType: "string",
      userResponse: {
        id: "string",
        firstName: "string",
        lastName: "string",
        email: "string",
        phoneNo: "string",
        dateOfBirth: "string",
        gender: "string",
      },
    },
    {
      id: "string",
      bookingDate: "string",
      time: "string",
      doctorResponse: {
        id: "string",
        name: "string",
        email: "string",
        phoneNo: "string",
        dateOfBirth: "string",
        gender: "string",
      },
      medicineResponse: {
        id: "string",
        name: "string",
      },
      description: "string",
      status: "string",
      bookingType: "string",
      userResponse: {
        id: "string",
        firstName: "string",
        lastName: "string",
        email: "string",
        phoneNo: "string",
        dateOfBirth: "string",
        gender: "string",
      },
    },
  ];
  return (
    <div className="w-full h-full flex flex-col gap-10 py-3 px-4">
      <div className="w-full flex flex-col gap-5">
        <div className="text-2xl font-bold">Welcome Doctor!</div>
        <div className="flex w-full p-2 gap-3 relative">
          <div className="self-center">
            <Image
              src={DoctorImage}
              alt="doctor"
              className="w-20 h-20 md:w-40 md:h-40 rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-3 py-3 px-3">
            <div className="text-xl font-semibold">Doctor Name</div>
            <div className="text-xl font-semibold">Specialization</div>
            <div className="text-lg font-semibold">Department</div>
          </div>
          <div className="absolute right-4 top-5">
            <EditIcon />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full gap-3">
        <div className="text-xl font-bold">Today&apos;s Appointments</div>
        {/* <div className="flex w-full snap-start overflow-x-scroll gap-3">
          {appointments.length > 0 ? (
            appointments.map((appointment: Appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <div className="w-full text-center text-gray-600 text-lg font-semibold">
              No Appointments today!
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Index;
