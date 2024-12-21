"use server";

import { Pet } from "@/lib/typings";
import { axiosInstance, imageaxiosInstance } from "@/utils/client";

export async function getAllFilterPets(
  pageCount?: number,
  pageSize?: number,
  name?: string
) {
  console.log("dfsdfdf", pageCount, pageSize);
  try {
    const response = await axiosInstance.get(`/pet/filter`, {
      params: {
        pageCount: pageCount,
        pageSize: pageSize,
        name: name ? name : undefined,
      },
    });
    return response?.data;
  } catch (error) {
    console.log("Error fetching pet data:", error);
  }
}

export async function getAllPets() {
  try {
    const response = await axiosInstance.get("/pets");
    return response.data;
  } catch (error) {
    console.log("Error fetching pets:", error);
  }
}

export async function createPet(pet: Pet) {
  try {
    const response = await axiosInstance.post("/pet", pet);
    console.log("pet create", response);
  } catch (error) {
    console.log("Error creating pet:", error);
  }
}

export async function getPetById(id: string) {
  try {
    const response = await axiosInstance.get(`/pet/${id}`);
    console.log("response", response);
    return response?.data;
  } catch (error) {
    console.log("Error fetching Pet by Id: ", error);
  }
}

export async function editPetById(
  id: string,
  values: { name: string; description: string }
) {
  try {
    const response = await axiosInstance.put(`/pet/${id}/update`, values);
    console.log("response", response);
    return response?.data;
  } catch (error) {
    console.log("Error fetching Pet by Id: ", error);
  }
}

export async function archivePetById(id: string) {
  try {
    const response = await axiosInstance.put(`/pet/active?id=${id}`);
    console.log("response", response);
    return response?.data;
  } catch (error) {
    console.log("Error archiving pets", error);
  }
}

export async function updatePetImage(id: any, imageFormData: FormData) {
  try {
    imageFormData.append("id", id)
    
    const response = await imageaxiosInstance.put(
      `pet/{id}/image`,
      imageFormData
    );
    console.log('object', response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      'Error updating hospital image:',
      error?.response?.data || error.message
    );
    throw error;
  }
}
