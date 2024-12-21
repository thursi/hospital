import { Separator } from "@/components/ui/separator";
import { dayTimeSlotResponses } from "@/lib/typings";
import { formatTime24to12 } from "@/lib/utils";
import MedicineDayTimeSlotModal from "./MedicineDayTimeSlotModal";

interface Props {
  medicineDayTimeSlotReponse: dayTimeSlotResponses[];
  duration: number;
  medicineId: string;
  setModal: any;
  modal: boolean;
  medicineAllocateTimeSlot?: any;
}

const MedicineTimeSlots = (props: Props) => {
  return (
    <div className="w-full flex flex-col px-5 gap-3 relative">
      <div className="absolute right-5 top-0">
        <MedicineDayTimeSlotModal
          id={props?.medicineId}
          medicineDayTimeSlotReponse={props.medicineDayTimeSlotReponse}
          setModalOpen={props?.setModal}
          modalOpen={props?.modal}
          medicineAllocateTimeSlot={props?.medicineAllocateTimeSlot}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">Duration</h1>
        <div className="text-lx font-semibold">
          {props?.duration ? `${props?.duration} minutes` : "Not Available"}
        </div>
      </div>
      <div className="flex flex-col w-1/2 min-w-fit gap-2">
        <h1 className="text-xl font-bold">Timeslots</h1>
        <div className="flex flex-col w-full min-w-fit gap-2 items-center">
          {props?.medicineDayTimeSlotReponse.length > 0 ? (
            props?.medicineDayTimeSlotReponse.map(
              (medicineDayTimeSlotReponse: dayTimeSlotResponses) => {
                return (
                  <div
                    key={medicineDayTimeSlotReponse.day}
                    className="flex flex-col gap-2 w-full bg-slate-100 rounded-lg px-3 py-1 shadow-md"
                  >
                    <div className="flex justify-between items-center text-lg font-semibold text-gray-600">
                      {medicineDayTimeSlotReponse?.day}
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-1">
                      {medicineDayTimeSlotReponse?.medicineTimeSlots.length > 0 ? (
                        <>
                          {medicineDayTimeSlotReponse?.medicineTimeSlots.map(
                            (timeslot: any, index: any) => (
                              <div
                                key={index}
                                className="font-semibold text-md w-fit rounded-lg p-2"
                              >
                                {formatTime24to12(timeslot.startTime)} -{" "}
                                {formatTime24to12(timeslot.endTime)}
                              </div>
                            )
                          )}
                        </>
                      ) : (
                        <div className="text-center font-semibold text-gray-500">
                          No timeslots available!
                        </div>
                      )}
                    </div>
                  </div>
                );
              }
            )
          ) : (
            <div className="text-lg font-bold text-gray-500">
              No Time Slots Available
            </div>
          )}
          <div className="text-lg font-bold">{}</div>
        </div>
      </div>
    </div>
  );
};

export default MedicineTimeSlots;
