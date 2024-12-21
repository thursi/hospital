// 'use server';
// import axios from 'axios';

// export const axiosInstance = axios.create({
//   baseURL: process.env.API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });


'use server';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  headers: {
 
    'Content-Type': 'application/json', 
  },
});

export const imageaxiosInstance = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'multipart/form-data', 
    'Accept': '*/*', 
  },
});

// Function to dynamically handle file uploads with multipart/form-data
// export const axiosInstanceImage = async (url: string, formData: FormData) => {

//     const response = await axiosInstance.put({
//       baseURL: process.env.API_URL,
//       headers: {
//         'Content-Type': 'multipart/form-data', // Override header only when sending a file
//       },
//     });
//     export const axiosInstanceImage = axios.put({
//       baseURL: process.env.API_URL,
//       headers: {
//         // You can set headers dynamically, or just set it for default
//         'Content-Type': 'application/json', // Default content type for JSON
//       },
//     });