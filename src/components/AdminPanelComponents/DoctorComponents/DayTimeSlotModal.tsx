"use client";
import EditIcon from "@/components/svg/edit_icon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DoctorDayTimeAllocation from "./DoctorDayTimeAllocation";

interface Props {
  modalOpen: boolean;
  setModalOpen: any;
  dayTimeSlotReponse: any;
  allocateTimeSlot?: any;
  id?: string;
}

const DayTimeSlotModal = (props: Props) => {
  return (
    <Dialog open={props?.modalOpen} onOpenChange={props?.setModalOpen}>
      <DialogTrigger>
        <div onClick={() => props?.setModalOpen(true)}>
          <EditIcon />
        </div>
      </DialogTrigger>
      <DialogContent className="h-[90vh] flex flex-col overflow-y-auto">
        {/* <DialogHeader>
        <DialogTitle>Day Time Allocations</DialogTitle>
      </DialogHeader>
      <DoctorDayTimeAllocation /> */}
        <DialogHeader>
          <DialogTitle>Timeslot Allocations</DialogTitle>
        </DialogHeader>
        <DoctorDayTimeAllocation
          id={props.id}
          setModal={props.setModalOpen}
          dayTimeSlotReponse={props.dayTimeSlotReponse}
          allocateTimeSlot={props.allocateTimeSlot}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DayTimeSlotModal;
