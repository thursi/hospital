'use server';

import { HospitalCreate } from '@/lib/typings';
import { axiosInstance } from '@/utils/client';

export async function getHospitals() {
  try {
    const response = await axiosInstance.get('/hospitals');
    return response?.data;
  } catch (error) {
    console.log('Error creating doctor:', error);
  }
}

export async function createHospital(hospital: HospitalCreate) {
  try {
    const response = await axiosInstance.post('/hospital', hospital);
    console.log('hospital create', response);
  } catch (error) {
    console.log('Error creating hospital:', error);
  }
}
export async function archiveHospitalById(id: string) {
  try {
    const response = await axiosInstance.put(`/hospital/active?id=${id}`);
    return response?.data;
  } catch (error) {
    console.log('Error archiving users', error);
  }
}

export async function getHospitalById(id: string) {
  try {
    const response = await axiosInstance.get(`/hospital/${id}`);
    return response?.data;
  } catch (error) {
    console.log('Error fetching Doctor by Id: ', error);
  }
}

export async function updateHospital(
  id: string,
  hospitalData: any
) {
  try {
    console.log("Sending hospital data:", hospitalData);
    const response = await axiosInstance.put(`/hospital/${id}/update`, hospitalData);

    console.log('API response:', response);
    return response?.data;
  } catch (error) {
    console.error('Error updating hospital:', error);
    throw error; 
  }
}
export async function updateHospitalDepartDoc(
  hospitalData: any
) {
  try {
    console.log("Sending hospital data:thusi", hospitalData);
    const response = await axiosInstance.put(`/hospitalDepartment`, hospitalData);

    console.log('API response:', response);
    return response?.data;
  } catch (error) {
    console.error('Error updating hospital:', error);
    throw error; 
  }
}

export const getHospitalFilterData = async (params: {
  pageCount?: number;
  pageSize?: number;
  searchTerm?: string;
  cityId?: string;
  hospitalId?: string;
  specializationId?: string;
  day?: string;
  doctorId?: string;
}) => {
  try {
    const response = await axiosInstance.get(`hospital/filter?`, {
      params: {
        pageSize: params.pageSize ? params.pageSize  : 5,
        pageCount: params.pageCount ?params.pageCount  : 1,
        searchTerm: params?.searchTerm ? params?.searchTerm :undefined,
        cityId: params?.cityId ?  params?.cityId :undefined,
        hospitalId:params?.hospitalId ?params?.hospitalId  :undefined,
        specializationId: params?.specializationId ? params?.specializationId :undefined,
        day: params?.day ? params?.day :undefined,
        doctorId: params?.doctorId ? params?.doctorId :undefined,


      },
    });

    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};
