'use client';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useState } from 'react';

interface DoctorViewDetailsProps {
  nameOfDocView: string;
  timeSlotsByDay: { [key: number]: TimeSlot[] };
  handleAccept: (slot: TimeSlot) => void;
  handleCancel: (slot: TimeSlot) => void;
}

interface TimeSlot {
  startTime: string;
  endTime: string;
  userName: string;
  userPhone: string;
}

const DoctorViewDetails: React.FC<DoctorViewDetailsProps> = ({
  nameOfDocView,
  timeSlotsByDay,
  handleAccept,
  handleCancel
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getStartOfWeek = (date: Date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay() + 1); // Adjust to Monday
    return start;
  };

  const startOfWeek = getStartOfWeek(currentDate);

  const nextWeek = () => {
    const newDate = new Date(startOfWeek);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const prevWeek = () => {
    const newDate = new Date(startOfWeek);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const getTimeSlotsForWeek = () => {
    const weekTimeSlots: { [key: number]: TimeSlot[] } = {};
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1; // Convert Sunday (0) to 6
      weekTimeSlots[dayIndex] = timeSlotsByDay[dayIndex] || [];
    }
    return weekTimeSlots;
  };

  const displayedTimeSlots = getTimeSlotsForWeek();

  return (
    <div className="container mx-auto mt-16 mb-20 px-4">
      <div className="flex flex-col w-full">
        <Card className="bg-white relative">
          <CardHeader>
            <CardTitle className="justify-center text-center align-center text-2xl font-semibold">
              Appointments
            </CardTitle>
          </CardHeader>

          {/* Date Navigation Section */}
          <div className="flex justify-between px-6 py-4">
            <button
              onClick={prevWeek}
              className="text-blue-600 font-medium hover:underline"
            >
              &lt; Prev
            </button>
            <span className="text-lg font-semibold">
              {startOfWeek.toLocaleDateString('en-US', { year: 'numeric' })}
            </span>
            <button
              onClick={nextWeek}
              className="text-blue-600 font-medium hover:underline"
            >
              Next &gt;
            </button>
          </div>

          {/* Appointments Table */}
          <div className="px-6 py-4 overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 bg-gray-200">
                    Day
                  </th>
                  <th className="border border-gray-300 px-4 py-2 bg-gray-200">
                    Date
                  </th>
                  <th className="border border-gray-300 px-4 py-2 bg-gray-200">
                    Time
                  </th>
                  <th className="border border-gray-300 px-4 py-2 bg-gray-200">
                    Client Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 bg-gray-200">
                    Client Phone
                  </th>
                  <th className="border border-gray-300 px-2 py-2 bg-gray-200">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {daysOfWeek.map((day, index) => {
                  const dayIndex = index; // Day index (0-6) for Monday to Sunday
                  const timeSlots = displayedTimeSlots[dayIndex];
                  const displayDate = new Date(startOfWeek);
                  displayDate.setDate(startOfWeek.getDate() + index);

                  return (
                    <React.Fragment key={index}>
                      {timeSlots.length > 0 ? (
                        timeSlots.map((slot, idx) => (
                          <tr className="justify-center text-center align-center"  key={idx}>
                            {idx === 0 && (
                              <>
                                <td
                                  className="border border-gray-300 px-4 py-2"
                                  rowSpan={timeSlots.length}
                                >
                                  {day}
                                </td>
                                <td
                                  className="border border-gray-300 px-4 py-2"
                                  rowSpan={timeSlots.length}
                                >
                                  {displayDate.toLocaleDateString('en-US', {
                                    day: 'numeric',
                                    month: 'short',
                                  })}
                                </td>
                              </>
                            )}
                            <td className="border justify-center border-gray-300 px-4 py-2">
                              {slot.startTime}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {slot.userName}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {slot.userPhone}
                            </td>
                            <td className="border border-gray-300 justify-center px-4 py-2">
                              <button
                                onClick={() => handleAccept(slot)}
                                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleCancel(slot)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                              >
                                Cancel
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr className="justify-center text-center align-center" key={index}>
                          <td className="border border-gray-300 px-4 py-2 ustify-center text-center align-center">
                            {day}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 ustify-center text-center align-center">
                            {displayDate.toLocaleDateString('en-US', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </td>
                          <td className="border justify-center border-gray-300 px-4 py-2 text-gray-500">
                            No Appointments
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center" colSpan={2}>
                            Closed
                          </td>
                          <td className="border border-gray-300 justify-center px-4 py-2">
                            <button
                              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                              disabled
                            >
                              Accept
                            </button>
                            <button
                              className="bg-red-500 text-white px-4 py-2 rounded"
                              disabled
                            >
                              Cancel
                            </button>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DoctorViewDetails;
