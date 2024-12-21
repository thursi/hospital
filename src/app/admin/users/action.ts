'use server';

import { axiosInstance, imageaxiosInstance } from '@/utils/client';

export async function getUserData(
  pageCount?: number,
  pageSize?: number,
  role?: string,
  name?: string,
) {
  try {
    const response = await axiosInstance.get(`/user/filter`, {
      params: {
        pageCount: pageCount,
        pageSize: pageSize,
        role: role ? role : undefined,
        name: name ? name : undefined,
      },
    });
    return response?.data;
  } catch (error) {
    console.log('Error fetching user data:', error);
  }
}

export async function getUserById(id: string) {
  try {
    const response = await axiosInstance.get(`/user/${id}`);
    return response?.data;
  } catch (error) {
    console.log('Error fetching User by Id: ', error);
  }
}

export async function archiveUserById(id: string) {
  try {
    const response = await axiosInstance.put(`/user/active?id=${id}`);
    return response?.data;
  } catch (error) {
    console.log('Error archiving users', error);
  }
}
export async function updateUserImage(id: any, imageFormData: FormData) {

  try {
    imageFormData.append("id", id)

    console.log("imageformadaf",imageFormData)
    
    const response = await imageaxiosInstance.put(
      `user/{id}/image`,
      imageFormData
    );
    console.log("response",response)
    return response.data;
  } catch (error: any) {
    console.error(
      'Error updating hospital image:',
      error?.response?.data || error.message
    );
    throw error;
  }
}
