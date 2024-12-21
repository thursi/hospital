import { Appointment } from "@/lib/typings";
interface Props {
  appointment: Appointment;
  key: string;
}

const AppointmentCard = ({appointment, key}: Props) => {
  return (
    <div className="bg-white relative rounded-lg appt:min-w-96 appt:w-96 min-w-full w-fit shadow-md p-4 flex flex-col gap-2">
      <div className="w-full text-xl font-bold ">description</div>
      <div className="text-lg flex flex-col font-semibold">
        <div>client name</div>
        <div>client number</div>
      </div>
      <div className="text-lg font-semibold self-end">Time</div>
      <div className="absolute bg-red-200 rounded-lg px-2 py-2 right-4">
        Status
      </div>
    </div>
  );
};

export default AppointmentCard;
