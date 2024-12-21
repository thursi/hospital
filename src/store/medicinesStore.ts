import { Appointment, Medicine } from "@/lib/typings";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  loading: boolean;
  medicines: Medicine[];
  filterMedicines: Medicine[];

  medicine: Medicine[];
  selectedMedicine: Medicine | null | undefined;
  setSelectedMedicine: (medicine: Medicine | null | undefined) => void;
  medicineAppointments: Appointment[];
  setMedicineAppointments: (appointments: Appointment[]) => void;
  setLoading: (loading: boolean) => void;
};

export const useMedicineStore = create<Store>()(
  persist(
    (set) => ({
      loading: true,
      medicines: [],
      filterMedicines: [],

      selectedMedicine: null,
      medicineAppointments: [],


      setAllMedicines: (medicines: any[]) => {
        set({ medicines: medicines, loading: false });
      },



      medicine: [],
      setAllMedicine: (medicine: any[]) => {
        set({ medicine: medicine, loading: false });
      },


      setFilterMedicines: (filterMedicines: any[]) => {
        set({ filterMedicines: filterMedicines, loading: false });
      },


      setSelectedMedicine: (medicine: Medicine | null | undefined) => {
        console.log("setSelectedMedicine", medicine);

        set({ selectedMedicine: medicine, loading: false });
      },
      setMedicineAppointments: (appointments: Appointment[]) => {
        set({ medicineAppointments: appointments });
      },
      setLoading: (loading: boolean) => {
        set({ loading: loading });
      },
    }),
    {
      name: "medicine_store",
    }
  )
);
