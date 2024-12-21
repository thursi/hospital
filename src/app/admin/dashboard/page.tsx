import AvailableDoctors from "@/components/AdminPanelComponents/AvailableDoctors";
import UpcomingAppointments from "@/components/AdminPanelComponents/UpcomingAppointments";

const Index = () => {
  return (
    <div className="flex flex-col gap-8 px-3 py-3">
      <UpcomingAppointments/>
      <AvailableDoctors/>
    </div>
  );
};

export default Index;
