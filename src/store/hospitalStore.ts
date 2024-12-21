import {
  departmentResponse,
  Doctor,
  doctorResponses,
  Hospital,
  medicineResponse,
} from '@/lib/typings';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
  loading: boolean;
  hospitals: Hospital[];
  filterAllHspitals: Hospital[];
  doctors: doctorResponses[];
  doctorsinhospital: any[];
  specializationinhospital: any[];

  departments: departmentResponse[];
  medicines: medicineResponse[];
  selectedHospital: Hospital | null | undefined;
  setAllHospitals: (hospitals: Hospital[]) => void;
  setSelectedHospital: (hospital: Hospital | null | undefined) => void;
  setDoctors: (doctorsinhospital: any[]) => void;
  setSpecialization: (specializationinhospital: any[]) => void;

  setDepartments: (departments: departmentResponse[]) => void;
  setMedicines: (medicines: medicineResponse[]) => void;
  setLoading: (loading: boolean) => void;
};

export const useHospitalStore = create<Store>()(
  persist(
    (set) => ({
      loading: true,
      hospitals: [],
      filterAllHspitals:[],
      doctors: [],
      doctorsinhospital:[],
      departments: [],
      medicines: [],
      specializationinhospital: [],
      selectedHospital: null,

      setAllHospitals: (hospitals: Hospital[]) => {
        set({ hospitals, loading: false });
      },
      
      setFilterAllHospitals: (filterAllHspitals: Hospital[]) => {
        set({ filterAllHspitals, loading: false });
      },
      
      setSelectedHospital: (hospital: Hospital | null | undefined) => {
        let departments: departmentResponse[] = [];
        let doctors: doctorResponses[] = [];
        let medicines: medicineResponse[] = [];
      
       
        hospital?.doctorDepartmentResponses?.forEach((department: any) => {
          if (department?.departmentResponse) {
            departments.push(department.departmentResponse);
          }
      
          department.doctorResponses?.forEach((doctor: any) => {
            if (!doctors?.some((doc: any) => doc?.id === doctor?.id)) {
              doctors.push(doctor);
            }
          });
        });
      
        hospital?.medicineResponses?.forEach((medicine: any) => {
          medicines.push(medicine);
        });
      
        // Update the store with all the processed data
        set({
          selectedHospital: hospital,
          departments,  
          doctors,      
          medicines,   
          loading: false,
        });
      
        console.log("Updated hospital and data:", hospital);
      },
      
      setDoctors: (doctorsinhospital: any[]) => {
        set({ doctorsinhospital, loading: false });
      },

      setSpecialization: (specializationinhospital: any[]) => {
        set({ specializationinhospital, loading: false });
      },


      setDepartments: (departments: departmentResponse[]) => {
        set({ departments, loading: false });
      },

      setMedicines: (medicines: medicineResponse[]) => {
        set({ medicines, loading: false });
      },

      setLoading: (loading: boolean) => {
        set({ loading });
      },
    }),
    {
      name: 'hospital_store',
    }
  )
);
