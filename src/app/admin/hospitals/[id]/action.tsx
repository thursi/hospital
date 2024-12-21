"use server";

import { DayTimeSlotResponses } from "@/lib/typings";
import { axiosInstance, imageaxiosInstance } from "@/utils/client";
import axios from "axios";

export async function getHospitalById(id: string) {
  try {
    const response = await axiosInstance.get(`/hospital/${id}`);
    return response?.data;
  } catch (error) {
    console.log('Error fetching Doctor by Id: ', error);
  }
}

// export async function updateHospitalImage(id: any, image: any) {
export async function updateHospitalImage(id: any, imageFormData: FormData) {
  try {
    imageFormData.append("id", id);

    const response = await imageaxiosInstance.put(
      `hospital/{id}/image`,
      imageFormData
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error updating hospital image:",
      error?.response?.data || error.message
    );
    throw error;
  }
}
