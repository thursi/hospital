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
import { DayTimeSlotResponses } from "@/lib/typings";
import { formatTime24to12 } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import TimePicker from "../../shared/time-picker";

interface Props {
  setModal: any;
  dayTimeSlotReponse: DayTimeSlotResponses[];
  allocateTimeSlot?: any;
  id?: string;
}

const formSchema = z.object({
  startTime: z.string({ required_error: "Start time is required!" }),
  endTime: z.string({ required_error: "End time is required!" }),
});

const DoctorDayTimeAllocation = (props: Props) => {
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

  const [dayTimeSlots, setDayTimeSlots] = useState(props.dayTimeSlotReponse);
  const [lastIndex, setLastIndex] = useState<number | undefined>(undefined);
  const [popoverStates, setPopoverStates] = useState<{
    [key: number]: boolean;
  }>({});

  const handlePopoverToggle = (index: number, open: boolean) => {
    setLastIndex(index);
    setPopoverStates((prev) => ({ ...prev, [index]: open }));
  };

  console.log(dayTimeSlots);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (lastIndex !== undefined) {
      if (lastIndex + 1 > dayTimeSlots.length) {
        dayTimeSlots[dayTimeSlots.length - 1].timeSlots = [
          ...dayTimeSlots[dayTimeSlots.length - 1].timeSlots,
          values,
        ];
        setDayTimeSlots([...dayTimeSlots]);
        form.reset();
        handlePopoverToggle(lastIndex, false);
        return;
      }
      console.log(values, lastIndex);
      dayTimeSlots[lastIndex].timeSlots = [
        ...dayTimeSlots[lastIndex].timeSlots,
        values,
      ];
      setDayTimeSlots([...dayTimeSlots]);
      form.reset();
      handlePopoverToggle(lastIndex, false);
    }
  };

  const removeTimeSlot = (timeslot: any, day: string) => {
    const updatedSlots = dayTimeSlots.map((slot) =>
      slot.day === day
        ? {
            ...slot,
            timeSlots: slot.timeSlots.filter(
              (timeSlot) => timeSlot !== timeslot
            ),
          }
        : slot
    );
    setDayTimeSlots(updatedSlots);
  };

  return (
    <div className="flex flex-col gap-5 h-[90%] justify-start">
      <div className="flex flex-col justify-evenly h-[90%] gap-3 overflow-y-auto">
        {days.map((day: string, index: number) => (
          <div key={index} className="flex flex-col gap-y-3 justify-center">
            <div className="flex gap-3 items-center pr-3 relative">
              <Switch
                defaultChecked={dayTimeSlots.some(
                  (dayTimeSlotResponse) => dayTimeSlotResponse.day === day
                )}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setDayTimeSlots([
                      ...dayTimeSlots,
                      { day, timeSlots: [], appointmentTimes: [] },
                    ]);
                    setLastIndex(index);
                  } else {
                    setDayTimeSlots(
                      dayTimeSlots.filter(
                        (dayTimeSlot) => dayTimeSlot.day !== day
                      )
                    );
                    setLastIndex(undefined);
                  }
                }}
              />
              <div className="font-semibold text-lg">{day}</div>
              {dayTimeSlots.some(
                (dayTimeSlotResponse) => dayTimeSlotResponse.day === day
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
            {dayTimeSlots
              .find((dayTimeSlotResponse) => dayTimeSlotResponse.day === day)
              ?.timeSlots?.map((timeslot, index) => (
                <div
                  key={index}
                  className="font-semibold text-lg self-end flex items-center gap-2"
                >
                  {formatTime24to12(timeslot.startTime)} -{" "}
                  {formatTime24to12(timeslot.endTime)}
                  <div
                    className="cursor-pointer"
                    onClick={() => removeTimeSlot(timeslot, day)}
                  >
                    <PlusIcon className="rotate-45" fill="#dc2626" />
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
      <Button
        disabled={dayTimeSlots === props.dayTimeSlotReponse}
        onClick={() =>
          props
            .allocateTimeSlot(props.id, dayTimeSlots)
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

export default DoctorDayTimeAllocation;
