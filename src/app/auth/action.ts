"use server";
import { axiosInstance } from "@/utils/client";
import { cookies } from "next/headers";

export const loginUser = async (userData: {
  email: string;
  password: string;
}) => {
  const cookieStore = cookies();
  try {
    const response = await axiosInstance.post("/admin/auth", {
      email: userData.email,
      password: userData.password,
    });
    cookieStore.set("token", JSON.stringify(response.data), { maxAge: 86400 });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};
export const registerUser = async (userData: {
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  dateOfBirth: string;
  gender: string;
  role: string;
}) => {
  try {
    const response = await axiosInstance.post(`/user`, {
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phoneNo: userData.phoneNo,
      dateOfBirth: userData.dateOfBirth,
      gender: userData.gender,
      role: userData.role,
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
