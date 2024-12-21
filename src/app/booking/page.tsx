"use client";
import Calentercomponents from "@/components/Calentercomponents";
import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

const Pets = () => {
  type TimeSlot = any;
  const [bookDetails, setBookDetails] = useState<any | undefined>(undefined);
  const SearchParams = useSearchParams();
  const doctors = SearchParams.get("imageQuery");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null
  );
  // const [selectedTimeSlot, setSelectedTimeSlot] = useState<any | null>(null);

  let docName = "";
  let imageName = "";
  let docId = "";
  let desrip = "";
  let specializationName = "";
  let dayTimeSlotResponses: any[] = [];

  // const router = useRouter();
  const router = useRouter();

  if (doctors) {
    try {
      const queryData = JSON.parse(doctors);
      docName = queryData.imageName || "";
      imageName = queryData.image || "";
      docId = queryData.id || "";
      desrip = queryData.description || "";
      specializationName = queryData?.specializationName || "";
      dayTimeSlotResponses = queryData?.dayTimeSlotResponses || [];
    } catch (error) {
      console.error("Error parsing imageQuery:", error);
    }
  }
  console.log("docIddocIddocId", docId);
  const dayMapping: { [key: string]: number } = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
  };

  const timeSlotsByDay = dayTimeSlotResponses.reduce((acc, response) => {
    const dayNumber = dayMapping[response.day] || 0;
    const appointmentTimes = response.appointmentTimes.map((time: string) => ({
      startTime: time,
      endTime: "",
    }));
    acc[dayNumber] = appointmentTimes;
    return acc;
  }, {});

  const handleDateChange = (value: Date) => {
    setSelectedDate(value);
  };

  const handleTimeSlotChange = (slot: {
    startTime: string;
    endTime: string;
  }) => {
    setSelectedTimeSlot(slot);
  };

  // const formatDate = (date: Date) => {
  //   return date.toLocaleDateString();
  // };

  const formatTime = (time: string) => {
    return time;
  };
  const handleContinue = () => {
    if (selectedDate && selectedTimeSlot) {
      const formattedDate = selectedDate.toISOString();
      const formattedStartTime = selectedTimeSlot.startTime
      const formattedEndTime = formatTime(selectedTimeSlot.endTime);

      console.log("`Selected date:',", formattedDate);
      console.log("`Selected time:',", formattedStartTime);
      if (formattedStartTime && formattedDate) {
    router.push(`/appointmentdoctor?date=${formattedDate}&time=${formattedStartTime}&doctorName=${docName}&specializationName=${specializationName}`);
}
    } else {
      alert("Please select both date and time.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray">
      <div style={{ width: "800px", height: "800px" }}>
        <Calentercomponents
          handleDateChange={handleDateChange}
          handleTimeSlotChange={handleTimeSlotChange}
          handleContinue={handleContinue}
          name={docName}
          timeSlotsByDay={timeSlotsByDay}
          description={desrip}
          Specialiction={specializationName}
          imageSrc={imageName}
        />
        {/* <Calentercomponentscopy
        handleDateChange={handleDateChange}
        handleTimeSlotChange={handleTimeSlotChange}
        handleContinue={handleContinue}
        name={docName}
        timeSlotsByDay={timeSlotsByDay}
        description={desrip}
        Specialiction={specializationName}
        imageSrc={imageName}/> */}
      </div>
    </div>
  );
};
export default Pets;
