import { Separator } from "@/components/ui/separator";
import { DayTimeSlotResponses } from "@/lib/typings";
import { formatTime24to12 } from "@/lib/utils";
import DayTimeSlotModal from "./DayTimeSlotModal";

interface Props {
  dayTimeSlotReponse: DayTimeSlotResponses[];
  duration: number;
  doctorId: string;
  setModal: any;
  modal: boolean;
  allocateTimeSlot?: any;
}

const DoctorTimeSlots = (props: Props) => {
  return (
    <div className="w-full flex flex-col px-5 gap-3 relative">
      <div className="absolute right-5 top-0">
        <DayTimeSlotModal
          id={props?.doctorId}
          dayTimeSlotReponse={props.dayTimeSlotReponse}
          setModalOpen={props?.setModal}
          modalOpen={props?.modal}
          allocateTimeSlot={props?.allocateTimeSlot}
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
          {props?.dayTimeSlotReponse.length > 0 ? (
            props?.dayTimeSlotReponse.map(
              (dayTimeSlotResponse: DayTimeSlotResponses) => {
                return (
                  <div
                    key={dayTimeSlotResponse.day}
                    className="flex flex-col gap-2 w-full bg-slate-100 rounded-lg px-3 py-1 shadow-md"
                  >
                    <div className="flex justify-between items-center text-lg font-semibold text-gray-600">
                      {dayTimeSlotResponse?.day}
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-1">
                      {dayTimeSlotResponse?.timeSlots.length > 0 ? (
                        <>
                          {dayTimeSlotResponse?.timeSlots.map(
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

export default DoctorTimeSlots;
