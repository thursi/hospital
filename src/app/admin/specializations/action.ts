"use server";

import { Specialization } from "@/lib/typings";
import { axiosInstance } from "@/utils/client";

export async function getSpecializationData(
  pageCount?: number,
  pageSize?: number,
  name?: string,
  departmentId?: number,

) {
  console.log("dfsdfdf", pageCount, pageSize);
  try {
    const response = await axiosInstance.get(`/specialization/filter`, {
      params: {
        pageCount: pageCount,
        pageSize: pageSize,
        name: name ? name : undefined,
        departmentId: departmentId ? departmentId : undefined,
      },
    });
    console.log("dffdfscs", response);
    return response?.data;
  } catch (error) {
    console.log("Error fetching specialization data:", error);
  }
}

export async function createSpecialization(specialization: Specialization) {
  try {
    const response = await axiosInstance.post("/specialization", specialization);
    console.log("specialization create", response);
  } catch (error) {
    console.log("Error creating specialization:", error);
  }
}

export async function getSpecializationById(id: string) {
  try {
    const response = await axiosInstance.get(`/specialization/${id}`);
    console.log("response", response);
    return response?.data;
  } catch (error) {
    console.log("Error fetching Specialization by Id: ", error);
  }
}

export async function editSpecializationById(
  id: string,
  values: { specializationName: string; description: string|undefined; departmentId: string  }
) {
  try {
    const response = await axiosInstance.put(`/specialization/${id}/update`, values);
    console.log("response", response);
    return response?.data;
  } catch (error) {
    console.log("Error fetching Specialization by Id: ", error);
  }
}

export async function archiveSpecializationById(id: string) {
  try {
    const response = await axiosInstance.put(`/specialization/active?id=${id}`);
    console.log("response", response);
    return response?.data;
  } catch (error) {
    console.log("Error archiving specializations", error);
  }
}

export const getAllSpecializationData = async () => {
  try {
    const response = await axiosInstance.get(`/specialization`);
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};