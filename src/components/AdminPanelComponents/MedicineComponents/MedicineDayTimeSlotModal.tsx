"use client";
import EditIcon from "@/components/svg/edit_icon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MedicineDayTimeAllocation from "./MedicineDayTimeAllocation";

interface Props {
  modalOpen: boolean;
  setModalOpen: any;
  medicineDayTimeSlotReponse: any;
  medicineAllocateTimeSlot?: any;
  id?: string;
}

const MedicineDayTimeSlotModal = (props: Props) => {
  return (
    <Dialog open={props?.modalOpen} onOpenChange={props?.setModalOpen}>
      <DialogTrigger>
        <div onClick={() => props?.setModalOpen(true)}>
          <EditIcon />
        </div>
      </DialogTrigger>
      <DialogContent className="h-auto flex flex-col overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Medicine Timeslot Allocations</DialogTitle>
        </DialogHeader>
        <MedicineDayTimeAllocation
          id={props.id}
          setModal={props.setModalOpen}
          medicineDayTimeSlotReponse={props.medicineDayTimeSlotReponse}
          medicineAllocateTimeSlot={props.medicineAllocateTimeSlot}
        />
      </DialogContent>
    </Dialog>
  );
};

export default MedicineDayTimeSlotModal;
