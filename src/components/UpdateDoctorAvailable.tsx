'use client';
import {
  Card
} from '@/components/ui/card';
import {
  faChevronLeft,
  faChevronRight,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addDays, format, startOfWeek } from 'date-fns';
import React, { useState } from 'react';
import './Scheduler.css';

interface UpdateDoctorAvailableProps {
  handleEdit: () => void;
  handleSave: (
    newName: string,
    newDescription: string,
    newSpecialiction: string
  ) => void;
  handleProfilePictureUpdate: (newImageSrc: string) => void;
  name: string;
  description: string;
  Specialiction: string;
  imageSrc: string;
  isEditing: boolean;
}

interface BookingSlot {
  day: string;
  date: string;
  time: string;
}

const UpdateDoctorAvailable: React.FC<UpdateDoctorAvailableProps> = ({
  handleEdit,
  handleSave,
  handleProfilePictureUpdate,
  name,
  description,
  imageSrc,
  Specialiction,
  isEditing,
}) => {
  const [editName, setEditName] = useState(name);
  const [editDescription, setEditDescription] = useState(description);
  const [editSpecialiction, setEditSpecialiction] = useState(Specialiction);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [step, setStep] = useState<number>(1);
  const [bookingSlots, setBookingSlots] = useState<BookingSlot[]>([]);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    startOfWeek(new Date())
  );

  const generateTimeSlots = (): string[] => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      const time = new Date();
      time.setHours(hour, 0, 0, 0);
      times.push(format(time, 'h:mm a'));
    }
    return times;
  };

  const times = generateTimeSlots();

  const generateWeekDates = (startDate: Date): string[] => {
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      weekDates.push(format(addDays(startDate, i), 'EEE dd'));
    }
    return weekDates;
  };

  const selectDate = (date: string) => {
    setSelectedDate(date);
    setStep(2);
  };

  const selectTime = (time: string) => {
    setSelectedTime(time);
    setStep(3);
  };

  const confirmBooking = () => {
    const selectedDay = format(
      new Date(currentWeekStart),
      'EEEE'
    ); // Getting the day of the week
    setBookingSlots([
      ...bookingSlots,
      { day: selectedDay, date: selectedDate, time: selectedTime },
    ]);
    setStep(4);
  };

  const addMoreSlots = () => {
    setSelectedDate('');
    setSelectedTime('');
    setStep(1);
  };

  const goToNextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7));
  };

  const goToPreviousWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, -7));
  };

  return (
    <div className="container mx-auto mt-4 mb-20 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mx-40">
        <div className="flex justify-center items-center font-bold text-xl lg:col-span-1">
          Create Available Time
        </div>

        <div className="lg:col-span-2 w-full">
          <Card className="bg-gray-200 relative mt-6 w-full m-8">
            {step === 1 && (
              <div id="date-picker">
                <h2 className="text-xl font-bold text-center mt-8">
                  Select a date
                </h2>
                <div className="text-end mt-2 mr-4 text-lg font-semibold">
                  {format(currentWeekStart, 'MMMM yyyy')}
                </div>
                <div className="flex justify-between p-2  mt-2">
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="cursor-pointer"
                    onClick={goToPreviousWeek}
                  />
                  <div className="dates flex justify-around">
                    {generateWeekDates(currentWeekStart).map((date) => (
                      <div
                        className="date cursor-pointer p-2 mb-8 border border-gray-400 rounded"
                        key={date}
                        onClick={() => selectDate(date)}
                      >
                        {date}
                      </div>
                    ))}
                  </div>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="cursor-pointer"
                    onClick={goToNextWeek}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div id="time-picker">
                <h2 className="text-xl font-bold mt-8 text-center">
                  Select a time
                </h2>
                <div className="times grid grid-cols-3 gap-4 mt-4 m-8">
                  {times.map((time) => (
                    <div
                      className="time cursor-pointer p-2 border items-center text-center  mb-8 border-gray-400 rounded"
                      key={time}
                      onClick={() => selectTime(time)}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div id="confirmation" className="p-4">
                <div>
                  <p className="text-lg">
                    Confirm your booking for{' '}
                    <span className="font-bold">{selectedDate}</span> at{' '}
                    <span className="font-bold">{selectedTime}</span>?
                  </p>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    className="p-2 bg-blue-500 text-white rounded"
                    onClick={confirmBooking}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div id="thank-you" className="p-4">
                <div className="flex justify-end items-end  mt-2">
                  <button
                    className="mt-2 p-2 bg-green-500 text-white rounded"
                    onClick={addMoreSlots}
                  >
                    <FontAwesomeIcon icon={faPlus} className="m-1  " />
                  </button>
                </div>
                <p className="text-lg font-bold text-center">
                  Thank you for creating available slot!
                </p>

                <div className="mt-4">
                  <h2 className="text-lg font-bold">Your Bookings:</h2>
                  <table className="min-w-full divide-y divide-gray-200 mt-4">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Day
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bookingSlots.map((slot, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {slot.day}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {slot.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {slot.time}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UpdateDoctorAvailable;
