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
