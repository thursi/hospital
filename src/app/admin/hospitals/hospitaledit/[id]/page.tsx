'use client';
import { DayPickerProvider, DayPickerProps } from 'react-day-picker'; 
import { useEffect, useState } from 'react';

// import DocCreateForm from '@/components/AdminPanelComponents/DoctorComponents/DocCreateForm';
// import { getDoctorData } from '../action';
import HospitalCreateForm from '@/components/AdminPanelComponents/HospitalComponents/HospitalCreateForm';
import { getCities, getMedicinesData } from '@/app/home/action';
import { useCityStore } from '@/store/citiesStore';
import { useMedicineStore } from '@/store/medicinesStore';
import { getHospitalById } from '../../action';
import { useHospitalStore } from '@/store/hospitalStore';
import HospitalEditForm from '@/components/AdminPanelComponents/HospitalComponents/HospitalEditForm';

const Index = ({ params }: { params: { id: string } }) => {

  const [selectedHospital, setSelectedHospital] = useHospitalStore((state: any) => [
    state.selectedHospital,
    state.setSelectedHospital,
  ]); 

  console.log("hospitalhospitalhospitalrthusiiii",selectedHospital)

  const [cities, setAllCities] = useCityStore((state: any) => [
    state.cities,
    state.setAllCities,
  ]);

  const [medicines, setAllMedicines] = useMedicineStore((state: any) => [
    state.medicines,
    state.setAllMedicines,
  ]);

  async function fetchData() {
    const hospitaldata = await getHospitalById(params.id);
    console.log("hospitalhospitalhospital",hospitaldata)
    setSelectedHospital(hospitaldata);
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
        <HospitalEditForm cities={cities} medicines={medicines} hospital={selectedHospital}   />
      </div>
    </DayPickerProvider>
  );
};

export default Index;

