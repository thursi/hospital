"use server";

import { Department } from "@/lib/typings";
import { axiosInstance } from "@/utils/client";

export async function getDepartmentData(
  pageCount?: number,
  pageSize?: number,
  name?: string
) {
  console.log("dfsdfdf", pageCount, pageSize);
  try {
    const response = await axiosInstance.get(`/department/filter`, {
      params: {
        pageCount: pageCount,
        pageSize: pageSize,
        name: name ? name : undefined,
      },
    });
    console.log("dffdfscs", response);
    return response?.data;
  } catch (error) {
    console.log("Error fetching department data:", error);
  }
}

export async function createDepartment(department: Department) {
  try {
    const response = await axiosInstance.post("/department", department);
    console.log("department create", response);
  } catch (error) {
    console.log("Error creating department:", error);
  }
}

export async function getDepartmentById(id: string) {
  try {
    const response = await axiosInstance.get(`/department/${id}`);
    console.log("response", response);
    return response?.data;
  } catch (error) {
    console.log("Error fetching Department by Id: ", error);
  }
}

export async function archiveDepartment(id: string) {
  try {
    const response = await axiosInstance.put(`/department/active?id=${id}`);
    console.log("department create", response);
    return response.data
  } catch (error) {
    console.log("Error creating department:", error);
  }
}

export async function editDepartmentById(
  id: string,
  values: { name: string; description: string }
) {
  try {
    const response = await axiosInstance.put(`/department/${id}/update`, values);
    console.log("response", response);
    return response?.data;
  } catch (error) {
    console.log("Error fetching Department by Id: ", error);
  }
}
