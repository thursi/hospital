'use client';
import moment from 'moment';
import React, { useState } from 'react';
import './Scheduler.css';
import { Calendar } from './ui/calendar';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';

import Image from 'next/image';
interface SchedulerProps {
  handleDateChange: (value: string | any) => void;
  handleTimeSlotChange: (slot: TimeSlot) => void;
  handleContinue: () => void;
  name: any;
  description: any;
  Specialiction: any;
  imageSrc: any;

  timeSlotsByDay: { [key: number]: TimeSlot[] };
}

interface TimeSlot {
  startTime: string;
  endTime: string;
}

const Scheduler: React.FC<SchedulerProps> = ({
  handleDateChange,
  handleTimeSlotChange,
  handleContinue,
  name,
  description,
  imageSrc,
  Specialiction,
  timeSlotsByDay,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot>({
    startTime: '',
    endTime: '',
  });
  const [is24HourFormat, setIs24HourFormat] = useState<boolean>(false);

 
  const router = useRouter();

  const onDateChange = (date: Date) => {
    setSelectedDate(date);
    console.log(date, 'THANUJAN')
    handleDateChange(date);
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  const getTimeSlots = (date: Date): TimeSlot[] => {
    const dayOfWeek = date.getDay();
    return timeSlotsByDay[dayOfWeek] || [];
  };

  const handleTimeChange = (slot: TimeSlot) => {
    setSelectedTimeSlot(slot);
    handleTimeSlotChange(slot);
  };

  const toggleTimeFormat = (format: '12h' | '24h') => {
    setIs24HourFormat(format === '24h');
  };

  const convertTo24HourFormat = (time: string) => {
    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0'
    )}`;
  };

  const formatTime = (time: string) => {
    if (is24HourFormat) {
      return convertTo24HourFormat(time);
    } else {
      return time;
    }
  };

  const timeSlots = getTimeSlots(selectedDate);

  const defaultImage = '/department.png';
  const [view, setView] = useState('initial');

  
  // const handleContinue = () => {
    
  //   // if (!selectedDate || !selectedTimeSlot) {
  //   //   // Handle case where date or time slot is not selected
  //   //   console.error("Please select a date and time slot.");
  //   //   return;
  //   // }
  
  //   const formattedDate = selectedDate.toISOString();
  //   const formattedTime = `${selectedTimeSlot.startTime}-${selectedTimeSlot.endTime}`;
  
  //   router.push(`/appointmentdoctor?date=${formattedDate}&time=${formattedTime}`);
  // };
  const handleContinueClickContinue = async () => {
    try {
      setView('next');
   //   await router.push('/appointmentdoctor');
      
    } catch (error) {
      console.error('Failed to navigate:', error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen container">
      {view === 'initial' ? (
        <Card className="bg-gray-200">
          <CardHeader>
            <CardTitle>Select a Date & Time</CardTitle>
            <CardDescription>
              When scheduling your appointment, you’ll have the flexibility to
              choose a date and time that fits your schedule. Our user-friendly
              scheduling system ensures that you can easily find available slots
              and secure your preferred appointment time.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4">
            <div className="col-span-1">
              <div className="flex items-center">
                <div className="flex-3">
                  <div className="relative overflow-hidden flex items-center justify-center w-16 h-16 rounded-full border-2 border-black">
                    <Image
                      src={imageSrc || defaultImage}
                      width={1500}
                      height={1500}
                      alt="ftgyuh"
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>
                <div className="flex-3 pl-4 text-lg font-bold whitespace-nowrap">
                  Doctor
                </div>
                <div className="flex-3 pl-4 italic text-lg text-gray-500 whitespace-nowrap">
                { name}
                </div>
              </div>
              <div className="flex mt-4">
                <div className="flex-3 pr-4 text-lg font-bold whitespace-nowrap">
                  Specialiction
                </div>
                <div className="flex-3 italic text-lg text-gray-500 whitespace-nowrap">
        {Specialiction}
                </div>
              </div>
              <div className="pr-4 text-lg">
             {description}</div>
           
            </div>
          </CardContent>
          <CardFooter className="justify-end items-center">
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-blue-700"
              onClick={handleContinueClickContinue}
            >
              Continue
            </button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="bg-gray-200">
          <CardHeader>
            <CardTitle>Select a Date & Time</CardTitle>
            <CardDescription>
              When scheduling your appointment,
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-4 mx-40">
            <div className="col-span container flex justify-center items-center ">
              <Calendar
                className="text-black-400 hover:text-red bg-white"
                onDayClick={onDateChange}
              />
            </div>
            <div className="col-span container mx-20">
              <div className="flex">
                <div className="flex-3 pr-4 px-8 mx-4 text-lg font-Medium whitespace-nowrap">
                  <div>Avalaible Times</div>
                </div>
                {/* <div className="flex items-center bg-white p-2 border rounded-lg ">
                  <div className="flex-1 pr-4 text-lg">
                    <div
                      className={`cursor-pointer rounded ${
                        !is24HourFormat ? 'bg-gray-300 text-white' : ''
                      }`}
                      onClick={() => toggleTimeFormat('12h')}
                    >
                      12h
                    </div>
                  </div>
                  <div className="flex-1 text-lg">
                    <div
                      className={`cursor-pointer rounded ${
                        is24HourFormat ? 'bg-gray-300 text-white' : ''
                      }`}
                      onClick={() => toggleTimeFormat('24h')}
                    >
                      24h
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="flex flex-col mt-4 mx-10 ">
                {timeSlots.map((slot, index) => (
                  <div
                    key={index}
                    className={`bg-green-400  p-2 mb-2 ml-2 rounded w-auto whitespace-nowrap text-lg items-center justify-center border cursor-pointer
                          ${
                            selectedTimeSlot &&
                            selectedTimeSlot.startTime === slot.startTime &&
                            selectedTimeSlot.endTime === slot.endTime
                              ? 'bg-red-800 text-white'
                              : ''
                          }`}
                    // style={{ maxWidth: '200px' }}
                    onClick={() => handleTimeChange(slot)}
                  >
                    {moment(slot.startTime, 'HH:mm').format('h:mm A')}
                    {/* {slot.startTime} */}
                    {/* - {formatTime(slot.endTime)} */}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end items-center">
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-blue-700"
              // onClick={handleContinue}
            >
              Continue
            </button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};


export default Scheduler;
