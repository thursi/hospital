"use server";

import { DayTimeSlotResponses } from "@/lib/typings";
import { axiosInstance, imageaxiosInstance } from "@/utils/client";

//Fetch doctor by ID
export async function getDoctorById(id: string) {
  try {
    const response = await axiosInstance.get(`/doctor/${id}`);
    console.log("response", response);
    return response?.data;
  } catch (error) {
    console.log("Error fetching Doctor by Id: ", error);
  }
}

export async function getAppointmentsByDoctorId(
  doctorId: string,
  pageCount?: number,
  pageSize?: number
) {
  try {
    const response = await axiosInstance.get(`/booking/filter`, {
      params: {
        doctorId: doctorId,
        pageCount: pageCount,
        pageSize: pageSize,
      },
    });
    return response?.data;
  } catch (error) {
    console.log("Error fetching Appointments by Doctor Id: ", error);
  }
}

export async function createTimeSlot(
  doctorId: string,
  dayAllocationRequestList: any
) {
  try {
    const response = await axiosInstance.post(
      `/doctor/${doctorId}/dayAllocation`,
      { doctorId: doctorId, dayAllocationRequestList: dayAllocationRequestList }
    );
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.log("Error creating Day allocation for doctor: ", error);
  }
}

export async function deleteTimeSlot(doctorId: string) {
  try {
    const response = await axiosInstance.delete(
      `/doctor/${doctorId}/delete/dayAllocation`
    );
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.log("Error creating Day allocation for doctor: ", error);
  }
}

export async function updateTimeSlot(
  doctorId: string,
  dayAllocationRequestList: DayTimeSlotResponses
) {
  console.log("dayAllocationRequestList", dayAllocationRequestList, doctorId);
  try {
    const response = await axiosInstance.put(
      `/doctor/${doctorId}/dayAllocation`,
      {
        doctorId: doctorId,
        dayAllocationRequestList: dayAllocationRequestList,
      }
    );
    console.log("day allocation response", response);
    return response.data;
  } catch (error) {
    console.log("Error updating time slot: ", error);
  }
}
// export async function updateHospitalImage(id: any, image: any) {
  export async function updateDoctorImage(id: any ,image:any) {

    // console.log("🚀 ~ updateHospitalImage ~ image:", image)
    // debugger
    
    try {
      const formData = new FormData();
      formData.append('image', image);  
  
      console.log("Uploading image for hospital:", id); 
      // debugger
  
      const response = await imageaxiosInstance.put(`hospital/{id}/image?id=${id}`, formData);
  console.log("object",response.data)
      return response.data; 
    } catch (error: any) {
      console.error("Error updating hospital image:", error?.response?.data || error.message);
      throw error;
    }
  }