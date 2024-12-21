'use client';
import { DayPickerProvider, DayPickerProps } from 'react-day-picker'; 
import { useEffect, useState } from 'react';
import { getAllPets, getAllSpecializations } from '@/api/route';
import { useAdminStore } from '@/store/adminStore';
import { usePetStore } from '@/store/petStore';
import { useSpecializationStore } from '@/store/specializationStore';
import { Button } from 'react-day-picker';
import { useRouter } from 'next/navigation';
import { DataTable } from '@/components/AdminPanelComponents/data-table';
// import DocCreateForm from '@/components/AdminPanelComponents/DoctorComponents/DocCreateForm';
// import { getDoctorData } from '../action';
// import HospitalCreateForm from '@/components/AdminPanelComponents/HospitalComponents/HospitalCreateForm';
import { getCities, getMedicinesData } from '@/app/home/action';
import { useMedicineStore } from '@/store/medicinesStore';
import HospitalCreateForm from '@/components/AdminPanelComponents/HospitalComponents/HospitalCreateForm';
import { useCityStore } from '@/store/citiesStore';
// import HospitalEditForm from '@/components/AdminPanelComponents/HospitalComponents/HospitalEditForm';

const Index = () => {
  
  const [cities, setAllCities] = useCityStore((state: any) => [
    state.cities,
    state.setAllCities,
  ]);

  const [medicines, setAllMedicines] = useMedicineStore((state: any) => [
    state.medicines,
    state.setAllMedicines,
  ]);

  async function fetchData() {
    // const data = await getDoctorData(1, 10);
    const citiesData = await getCities();
    const medicinesData = await getMedicinesData();

    setAllMedicines(medicinesData);
    setAllCities(citiesData);
  }

  useEffect(() => {
    fetchData();
  }, []);


  const dayPickerProps: DayPickerProps = {
    mode: 'single', 
    required: false,
  };

  return (
    <DayPickerProvider initialProps={dayPickerProps}>
      {' '}
      <div className="container flex flex-col gap-4 mx-auto py-5 relative">
        <HospitalCreateForm cities={cities} medicines={medicines}        />
      </div>
    </DayPickerProvider>
  );
};

export default Index;
