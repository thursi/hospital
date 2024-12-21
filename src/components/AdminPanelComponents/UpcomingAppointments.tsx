import { Appointment } from "@/lib/typings";
import AppointmentCard from "../AppointmentCard";

const UpcomingAppointments = () => {
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
    <div className="flex flex-col gap-4">
      <div className="text-xl font-bold">Upcoming Appointments</div>
      {/* <div className="flex w-full overflow-x-auto gap-3">
        {appointments.length > 0 ? (
          appointments.map((appointment: Appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))
        ) : (
          <div className="text-2xl self-center flex text-gray-600 justify-center items-center w-full font-bold h-32">
            No upcoming appointments!
          </div>
        )}
      </div> */}
    </div>
  );
};

export default UpcomingAppointments;
