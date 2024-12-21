'use server';
import { axiosInstance } from '@/utils/client';

export const getDoctorData = async () => {
  try {
    const response = await axiosInstance.get(`/doctors`);
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};
export const getSpecializationData = async () => {
  try {
    const response = await axiosInstance.get(`/specialization`);
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};
export const getDoctorByIdData = async (doctorid: any) => {
  try {
    const response = await axiosInstance.get(`/doctor/${doctorid}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching doctor data:', error);
    return null;
  }
};
export const getDepartmentData = async () => {
  try {
    const response = await axiosInstance.get(`/departments`);
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};

export const getPetData = async () => {
  try {
    const response = await axiosInstance.get(`/pets`);
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};
export const getMedicinesData = async () => {
  try {
    const response = await axiosInstance.get(`/medicines`);

    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};

export const getDeparmentFilterData = async (params: {
  pageCount: number;
  pageSize: number;
}) => {
  try {
    const response = await axiosInstance.get(`/department/filter`, {
      params: {
        pageSize: params.pageSize,
        pageCount: params.pageCount,
      },
    });
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};

export const gethospitalFilterAllData = async (params: {
  pageCount: number;
  pageSize: number;
}) => {
  try {
    const response = await axiosInstance.get(`/hospital/filter`, {
      params: {
        pageSize: params.pageSize,
        pageCount: params.pageCount,
      },
    });
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};

export const getDoctorFilterData = async (params: {
  pageSize: number;
  pageCount: number;
  name?: string;
  departmentId?: number;
  petId?: number;
  specializationId?: number;
  date?: string;
}) => {

  try {
    console.log("paramsparamsparams",params)
    const response = await axiosInstance.get(
      `/doctor/filter`,
      {
        params: {
          pageSize: params.pageSize?params.pageSize :undefined,
          pageCount: params.pageCount?params.pageCount:undefined,
          departmentId:params?.departmentId? params?.departmentId:undefined,
          petId:params?.petId? params?.petId:undefined,
          specializationId:  params?.specializationId?params?.specializationId:undefined,
          date:params?.date? params?.date:undefined,


          
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};

// export async function getDoctorFilterData(
//   pageCount: number,
//   pageSize: number,
//   name?: string,
//   // departmentId?: number;
//   petId?: number,
//   specializationId?:number,
//   date?: string,
// ) {
//   try {
//     const response = await axiosInstance.get(`/doctor/filter`, {
//       params: {

//         pageSize: pageSize?pageSize: undefined,
//         pageCount: pageCount? pageCount: undefined,
//         name: name?name: undefined,
//         // departmentId: params?.departmentId ,
//         petId:petId? petId : undefined,
//         specializationId:specializationId? specializationId: undefined,
//         date: date?date: undefined,

//       },
//     });
//     return response?.data;
//   } catch (error) {
//     console.log("Error fetching Appointments by Doctor Id: ", error);
//   }
// }

// export const getDoctorFilterData = async (params: {
//   pageCount: number;
//   pageSize: number;
//   name?: string;
//   departmentId?: number;
//   petId?: number;
//   specializationId?:number;
//   date?: string;
// }) => {
//   try {
//     console.log("paramsparamsparams",params)

//     const response = await axiosInstance.get(`doctor/filter?`, {
//       params: {
//         pageSize: params.pageSize ?params.pageSize  :undefined,
//         pageCount: params.pageCount ?params.pageCount  :undefined,
//         name: params?.name ? params?.name :undefined,
//         departmentId: params?.departmentId ?  params?.departmentId :undefined,
//         petId:params?.petId ?params?.petId  :undefined,
//         specializationId: params?.specializationId ? params?.specializationId :undefined,
//         date: params?.date ? params?.date :undefined,

//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.log('error', error);
//   }
// };

// export async function getDoctorFilterData(
//   pageCount?: number,
//   pageSize?: number,
//   specializationId?: string,
//   departmentId?: string,
//   petId?: string,
//   name?: string,
//   date?: string
// ) {

//   try {
//     const response = await axiosInstance.get(`/doctor/filter`, {
//       params: {
//         pageCount: pageCount,
//         pageSize: pageSize,
//         specializationId: specializationId ? specializationId : undefined,
//         departmentId: departmentId ? departmentId : undefined,
//         petId: petId ? petId : undefined,
//         name: name ? name : undefined,
//         date:date?date : undefined,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.log('error', error);
//   }
// };

export const getPetFilterData = async (params: {
  pageCount: number;
  pageSize: number;
}) => {
  try {
    const response = await axiosInstance.get(`/pet/filter`, {
      params: {
        pageSize: params.pageSize,
        pageCount: params.pageCount,
      },
    });
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};

export const getMedicineFilterData = async (params: {
  pageCount: number;
  pageSize: number;
  name?: string;
  date?: string;
}) => {
  try {
    const response = await axiosInstance.get(`/medicine/filter`, {
      params: {
        pageSize: params.pageSize,
        pageCount: params.pageCount,
        name: params.name,
        date: params.date,
      },
    });
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};

export const getBookingFilterData = async (params: {
  doctorId: any;
  pageCount: number;
  pageSize: number;
}) => {
  try {
    const response = await axiosInstance.get(`/booking/filter`, {
      params: {
        doctorId: params.doctorId,
        pageSize: params.pageSize,
        pageCount: params.pageCount,
      },
    });
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};

export const appointmentbooking = async (
  id: any,
  bookingDate: any,
  time: any,
  description: any,
  bookingType: any,
  userId: any
) => {
  try {
    const data = {
      id,
      bookingDate,
      time,
      description,
      bookingType,
      userId,
    };

    const response = await axiosInstance.post('/booking', data);
    return response.data;
  } catch (error) {
    console.error('error');
  }
};

export const get = async (params: { pageCount: number; pageSize: number }) => {
  try {
    const response = await axiosInstance.get(`/medicine/filter`, {
      params: {
        pageSize: params.pageSize,
        pageCount: params.pageCount,
      },
    });
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};

export const getAppointmentBooking = async () => {
  try {
    const response = await axiosInstance.get(
      `/booking/filter?userId=1&pageSize=10&pageCount=1`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching booking:', error);
    throw error; // Ensures the calling function can handle the error if needed
  }
};

export const getHospitalFilterData = async (params: {
  pageCount: number;
  pageSize: number;
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
        pageSize: params.pageSize ? params.pageSize : undefined,
        pageCount: params.pageCount ? params.pageCount : undefined,
        searchTerm: params?.searchTerm ? params?.searchTerm : undefined,
        cityId: params?.cityId ? params?.cityId : undefined,
        hospitalId: params?.hospitalId ? params?.hospitalId : undefined,
        specializationId: params?.specializationId
          ? params?.specializationId
          : undefined,
        day: params?.day ? params?.day : undefined,
        doctorId: params?.doctorId ? params?.doctorId : undefined,
      },
    });

    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};

export const getCities = async () => {
  try {
    const response = await axiosInstance.get(`/cities`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getByIdHospital = async (id: any) => {
  try {
    const response = await axiosInstance.get(`/hospital/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching doctor data:', error);
    return null;
  }
};
export const getHospitals = async () => {
  try {
    const response = await axiosInstance.get(`/hospitals`);
    return response.data;
  } catch (error) {
    console.error('Error fetching doctor data:', error);
    return null;
  }
};
export const getAppointmentBookingFilterData = async (params: {
  pageCount: number;
  pageSize: number;
  userId: string;
}) => {
  try {
    const response = await axiosInstance.get(`booking/filter?`, {
      params: {
        pageSize: params.pageSize,
        pageCount: params.pageCount,
        userId: params.userId,
      },
    });

    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};
