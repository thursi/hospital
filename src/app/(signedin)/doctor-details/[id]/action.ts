"use server";
import { axiosInstance } from "@/utils/client";
export async function getDoctorById(id: string) {
  try {
    const response = await axiosInstance.get(`/doctor/${id}`);
    console.log("response", response);
    return response?.data;
  } catch (error) {
    console.log("Error fetching Doctor by Id: ", error);
  }
}
