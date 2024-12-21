"use server";

import { axiosInstance } from "@/utils/client";

export async function getBookingData(
  pageCount?: number,
  pageSize?: number,
  doctorId?: number,
  medicineId?: number,
  userId?: number,
  status?: string,
  bookingType?: string,
  
) {
  console.log("dfsdfdf", pageCount, pageSize);
  try {
    const response = await axiosInstance.get(`/booking/filter`, {
      params: {
        pageCount: pageCount,
        pageSize: pageSize,
        doctorId: doctorId ? doctorId : undefined,
        medicineId: medicineId ? medicineId : undefined,
        userId: userId ? userId : undefined,
        status: status ? status : undefined,
        bookingType: bookingType ? bookingType : undefined,
      },
    });
    console.log("dffdfscs", response);
    return response?.data;
  } catch (error) {
    console.log("Error fetching booking data:", error);
  }
}

export async function getBookingById(id: string) {
  try {
    const response = await axiosInstance.get(`/booking/${id}`);
    console.log("response", response);
    return response?.data;
  } catch (error) {
    console.log("Error fetching Booking by Id: ", error);
  }
}


export async function cancelBooking(id: string) {
  try {
    const response = await axiosInstance.put(`/booking/${id}/cancel`);
    console.log("response", response);
    return response?.data;
  } catch (error) {
    console.log("Error archiving bookings", error);
  }
}
