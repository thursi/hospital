"use client";

import { useBookingStore } from "@/store/bookingStore";
import { useEffect, useCallback } from "react";
import { getBookingById } from "../action";

const Index = ({ params }: { params: { id: string } }) => {
  const [selectedBooking, setSelectedBooking, loading] = useBookingStore(
    (state: any) => [
      state.selectedBooking,
      state.setSelectedBooking,
      state.loading,
    ]
  );

  const handleSelectBooking = useCallback(async () => {
    const data = await getBookingById(params.id);
    setSelectedBooking(data);
  }, [params.id, setSelectedBooking]);

  useEffect(() => {
    handleSelectBooking();
  }, [handleSelectBooking]); // Include handleSelectBooking in the dependency array

  if (loading) {
    return <div>Loading...!</div>;
  }

  const {
    userResponse,
    doctorResponse,
    bookingDate,
    time,
    medicineResponse,
    description,
    status,
    bookingType,
    petName,
    petAge,
    petType,
  } = selectedBooking || {};

  return (
    <div className="flex flex-col px-3 bg-white py-5 h-full w-full rounded-lg">
      <div className="flex relative">
        <div className="grow flex flex-col gap-2 px-3 py-2">
          <div className="text-lg">
            <div>
              <strong>Booking Date:</strong> {bookingDate}
            </div>
            <div>
              <strong>Time:</strong> {time}
            </div>
            <div>
              <strong>Booking Status:</strong> {status}
            </div>
            <div>
              <strong>Pet Name:</strong> {petName}
            </div>
            <div>
              <strong>Pet Age:</strong> {petAge}
            </div>
            <div>
              <strong>Pet Type:</strong> {petType}
            </div>
            <div>
              <strong>Description:</strong> {description}
            </div>
          </div>
        </div>
      </div>
      {bookingType === "DOCTOR" ? (
        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-bold">Doctor Details</h3>
          <div>
            <strong>Name:</strong> {doctorResponse?.name}
          </div>
          <div>
            <strong>Email:</strong> {doctorResponse?.email}
          </div>
          <div>
            <strong>Phone:</strong> {doctorResponse?.phoneNo}
          </div>
          <div>
            <strong>Date of Birth:</strong> {doctorResponse?.dateOfBirth}
          </div>
          <div>
            <strong>Gender:</strong> {doctorResponse?.gender}
          </div>
          <div>
            <strong>Specialization:</strong>{" "}
            {doctorResponse?.specialization}
          </div>
          <div>
            <strong>Department:</strong> {doctorResponse?.department}
          </div>
        </div>
      ) : (
        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-bold">Medicine Details</h3>
          <div>
            <strong>Name:</strong> {medicineResponse?.name}
          </div>
          <div>
            <strong>Description:</strong> {medicineResponse?.description}
          </div>
        </div>
      )}
      <div className="mt-4 p-3 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-bold">User Details</h3>
        <div>
          <strong>Name:</strong> {userResponse?.firstName} {userResponse?.lastName}
        </div>
        <div>
          <strong>Email:</strong> {userResponse?.email}
        </div>
        <div>
          <strong>Phone:</strong> {userResponse?.phoneNo}
        </div>
        <div>
          <strong>Date of Birth:</strong> {userResponse?.dateOfBirth}
        </div>
        <div>
          <strong>Gender:</strong> {userResponse?.gender}
        </div>
      </div>
    </div>
  );
};

export default Index;
