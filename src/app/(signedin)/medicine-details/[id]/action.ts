"use server";
import { axiosInstance } from "@/utils/client";
export async function getMedicinceById(id: string) {
  try {
    const response = await axiosInstance.get(`/medicine/${id}`);
    console.log("response", response);
    return response?.data;
  } catch (error) {
    console.log("Error fetching Doctor by Id: ", error);
  }
}
