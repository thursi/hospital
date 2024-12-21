'use server';
import { axiosInstance } from '@/utils/client';
import { cookies } from 'next/headers';

export const changePassword = async (userData: {
  oldPassword: string;
  newPassword: string;
}) => {
  try {
    const cookieStore = cookies();
    const userDetails = await cookieStore.get('token');
    const getuserDetails = JSON.parse(userDetails?.value!);
    const response = await axiosInstance.put(
      `user/changePassword`,
      {
        oldPassword: userData?.oldPassword,
        newPassword: userData?.newPassword,
      },
      {
        headers: {
          // 'BearerToken': `${(getuserDetails?.token)}`
          Authorization: 'Bearer ' + getuserDetails?.token,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
