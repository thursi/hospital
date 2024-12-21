"use client";
import PlusIcon from "@/components/svg/plus_icon";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { dayTimeSlotResponses } from "@/lib/typings";
import { formatTime24to12 } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import TimePicker from "../../shared/time-picker";

interface Props {
  setModal: any;
  medicineDayTimeSlotReponse: dayTimeSlotResponses[];
  medicineAllocateTimeSlot?: any;
  id?: string;
}

const formSchema = z.object({
  startTime: z.string({ required_error: "Start time is required!" }),
  endTime: z.string({ required_error: "End time is required!" }),
});

const MedicineDayTimeAllocation = (props: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startTime: undefined,
      endTime: undefined,
    },
  });

  const days = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];

  const [medicineDayTimeSlots, setMedicineDayTimeSlots] = useState(props.medicineDayTimeSlotReponse);
  const [lastIndex, setLastIndex] = useState<number | undefined>(undefined);
  const [popoverStates, setPopoverStates] = useState<{
    [key: number]: boolean;
  }>({});

  const handlePopoverToggle = (index: number, open: boolean) => {
    setLastIndex(index);
    setPopoverStates((prev) => ({ ...prev, [index]: open }));
  };


  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (lastIndex !== undefined) {
      if (lastIndex + 1 > medicineDayTimeSlots.length) {
        medicineDayTimeSlots[medicineDayTimeSlots.length - 1].medicineTimeSlots = [
          ...medicineDayTimeSlots[medicineDayTimeSlots.length - 1].medicineTimeSlots,
          values,
        ];
        setMedicineDayTimeSlots([...medicineDayTimeSlots]);
        form.reset();
        handlePopoverToggle(lastIndex, false);
        return;
      }
      console.log(values, lastIndex);
      medicineDayTimeSlots[lastIndex].medicineTimeSlots = [
        ...medicineDayTimeSlots[lastIndex].medicineTimeSlots,
        values,
      ];
      setMedicineDayTimeSlots([...medicineDayTimeSlots]);
      form.reset();
      handlePopoverToggle(lastIndex, false);
    }
  };

  const removeMedicineTimeSlot = (medicineTimeslot: any, day: string) => {
    const updatedSlots = medicineDayTimeSlots.map((slot) =>
      slot.day === day
        ? {
            ...slot,
            medicineTimeSlots: slot.medicineTimeSlots.filter(
              (medicineTimeSlot) => medicineTimeSlot !== medicineTimeslot
            ),
          }
        : slot
    );
    setMedicineDayTimeSlots(updatedSlots);
  };

  return (
    <div className="flex flex-col gap-5 h-[90%] justify-start">
      <div className="flex flex-col justify-evenly h-[90%] gap-3 overflow-y-auto">
        {days.map((day: string, index: number) => (
          <div key={index} className="flex flex-col gap-y-3 justify-center">
            <div className="flex gap-3 items-center pr-3 relative">
              <Switch
                defaultChecked={medicineDayTimeSlots.some(
                  (medicineDayTimeSlotResponse) => medicineDayTimeSlotResponse.day === day
                )}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setMedicineDayTimeSlots([
                      ...medicineDayTimeSlots,
                      { day, medicineTimeSlots: [], appointmentTimes: [] },
                    ]);
                    setLastIndex(index);
                  } else {
                    setMedicineDayTimeSlots(
                      medicineDayTimeSlots.filter(
                        (medicineDayTimeSlot) => medicineDayTimeSlot.day !== day
                      )
                    );
                    setLastIndex(undefined);
                  }
                }}
              />
              <div className="font-semibold text-lg">{day}</div>
              {medicineDayTimeSlots.some(
                (medicineDayTimeSlotResponse) => medicineDayTimeSlotResponse.day === day
              ) && (
                <Popover
                  open={popoverStates[index] || false}
                  onOpenChange={(open) => handlePopoverToggle(index, open)}
                >
                  <PopoverTrigger>
                    <div className="absolute z-10 right-0 cursor-pointer">
                      <PlusIcon />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="absolute">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 px-2 flex flex-col"
                      >
                        <div className="flex justify-between gap-x-2">
                          <FormField
                            control={form.control}
                            name="startTime"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Start time</FormLabel>
                                <FormControl>
                                  <TimePicker
                                    values={form.getValues()}
                                    value={field.value}
                                    onChange={field.onChange}
                                    startTime={false}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="endTime"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>End time</FormLabel>
                                <FormControl>
                                  <TimePicker
                                    startTime={true}
                                    values={form.getValues()}
                                    value={field.value}
                                    onChange={field.onChange}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <Button className="self-end" type="submit">
                          Add
                        </Button>
                      </form>
                    </Form>
                  </PopoverContent>
                </Popover>
              )}
            </div>
            {medicineDayTimeSlots
              .find((medicineDayTimeSlotResponse) => medicineDayTimeSlotResponse.day === day)
              ?.medicineTimeSlots?.map((medicineTimeslot, index) => (
                <div
                  key={index}
                  className="font-semibold text-lg self-end flex items-center gap-2"
                >
                  {formatTime24to12(medicineTimeslot.startTime)} -{" "}
                  {formatTime24to12(medicineTimeslot.endTime)}
                  <div
                    className="cursor-pointer"
                    onClick={() => removeMedicineTimeSlot(medicineTimeslot, day)}
                  >
                    <PlusIcon className="rotate-45" fill="#dc2626" />
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
      <Button
        disabled={medicineDayTimeSlots === props.medicineDayTimeSlotReponse}
        onClick={() =>
          props
            .medicineAllocateTimeSlot(props.id, medicineDayTimeSlots)
            .then((response: any) => {
              if (response.success) {
                toast.success(response.message, {className: 'bg-green-200'});
                props.setModal(false);
              } else {
                toast.error("Oops! Something went wrong. Try again.");
                props.setModal(false);
              }
            })
        }
        className="self-end"
      >
        Update
      </Button>
    </div>
  );
};

export default MedicineDayTimeAllocation;
