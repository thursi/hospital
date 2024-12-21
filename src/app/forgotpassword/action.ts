'use server';
import { axiosInstance } from '@/utils/client';

export const forgotPassword = async (email: string) => {
  try {
    const response = await axiosInstance.post(
      `/user/forgotPassword/${email}`,
      {}
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const resetPassword = async (userData: {
  otp: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.put(`/user/resetPassword`, {
      otp: userData.otp,
      password: userData.password,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
