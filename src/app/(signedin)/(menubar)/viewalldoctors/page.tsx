'use client';
import { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { format } from 'date-fns';
import {
  getCities,
  getDepartmentData,
  getDoctorData,
  getDoctorFilterData,
  getMedicinesData,
  getPetData,
} from '../../../home/action';
import { useDoctorStore } from '@/store/doctorStore';
import { useCityStore } from '@/store/citiesStore';
import { useDepartmentStore } from '@/store/departmentStore';
import { useSpecializationStore } from '@/store/specializationStore';
import { usePetStore } from '@/store/petStore';
import { useMedicineStore } from '@/store/medicinesStore';

import Loader from '@/components/Loader';
import FilterDropdown from '@/components/FilterDropdown';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import MultipleImagesDoctorProps from '@/components/DoctorComponent/doctorCardall';
import { ArrowRight, CalendarIcon } from 'lucide-react';
import { getAllSpecializations } from '@/api/route';

interface Doctor {
  preSignedUrl: string;
  image: string;
  name: string;
  description: string;
}

const Doctors = ({ params }: { params: { records: string } }) => {
  const [doctorNames, setDoctorNames] = useState<any[]>([]);
  const [docName, setDocName] = useState<any>('');
  const [hospitalType, setHospitalType] = useState('');
  const [nameSpecialization, setSelectedSpecialization] = useState<any>('');
  const [selectedDeparment, setSelectedDeparment] = useState<any>('');
  const [selectedPet, setSelectedPet] = useState<any>('');
  const [selectedDate, setSelectedDate] = useState<any>();
  const [open, setOpen] = useState(false);

  const [allDoctors, setAllDoctors, loading, setLoading] = useDoctorStore(
    (state: any) => [
      state.doctors,
      state.setAllDoctors,
      state.loading,
      state.setLoading,
    ]
  );

  const [departments, setAllDepartments] = useDepartmentStore((state: any) => [
    state.departments,
    state.setAllDepartments,
  ]);

  const [specialization, setAllSpecialization] = useSpecializationStore(
    (state: any) => [state.specialization, state.setAllSpecialization]
  );

  const [pets, setAllPets] = usePetStore((state: any) => [
    state.pets,
    state.setAllPets,
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleFilterClick();
  }, [
    docName,
    selectedDeparment,
    selectedPet,
    nameSpecialization,
    selectedDate,
  ]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const petData = await getPetData();
      const departmentData = await getDepartmentData();
      const specializations = await getAllSpecializations();

      setAllPets(petData);
      setAllDepartments(departmentData);
      setAllSpecialization(specializations);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterClick = useCallback(
    debounce(async () => {
      const date = selectedDate ? format(new Date(selectedDate), 'yyyy-MM-dd') : undefined;
      try {
        setLoading(true);
        const filterResponse = await getDoctorFilterData({
          pageSize: 10,
          pageCount: 1,
          name: docName,
          departmentId: selectedDeparment?.value,
          petId: selectedPet?.value,
          specializationId: nameSpecialization?.value,
          date: date
        });

    
        setAllDoctors(filterResponse?.records || []);
      } catch (error) {
        console.error('Error fetching filtered data:', error);
      } finally {
        setLoading(false);
      }
    }, 500),
    [docName, selectedDeparment, selectedPet, nameSpecialization, selectedDate]
  );

  const departmentOptions = departments.map((dept: any) => ({
    label: dept.name,
    value: dept.id,
  }));

  const specializationOptions = specialization.map((spec: any) => ({
    label: spec.specializationName,
    value: spec.id,
  }));

  const petsOptions = pets.map((pet: any) => ({
    label: pet.name,
    value: pet.id,
  }));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="h-10 w-10" />
      </div>
    );
  }

  const handleDateChange = (e: any) => {
    const inputDate = e.target.value;
    setDocName(inputDate);
  };

  return (
    <div className="py-8 w-full container pt-20 pb-20 px-0 md:px-7 mx-auto">
      <div className="bg-white rounded-lg mt-10 shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search doctors"
            value={docName}
            onChange={handleDateChange}
            className="block w-full px-3 py-2 border rounded-md focus:ring-indigo-500"
          />

          <FilterDropdown
            options={specializationOptions}
            placeholder="👩‍⚕️ Specialization"
            onChange={setSelectedSpecialization}
            value={nameSpecialization}
          />

          <FilterDropdown
            options={departmentOptions}
            placeholder="👩‍⚕️ Department"
            onChange={setSelectedDeparment}
            value={selectedDeparment}
          />

          <FilterDropdown
            options={petsOptions}
            placeholder="👩‍⚕️ Pet"
            onChange={setSelectedPet}
            value={selectedPet}
          />

          <div className="relative">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button className="bg-white border rounded-lg px-4 py-2 w-full flex justify-between items-center">
                  {selectedDate
                    ? format(selectedDate, 'PPP')
                    : '📅 Select Date'}
                  <CalendarIcon className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="start" className="p-0 z-50">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    // setSelectedDate(format(date, 'yyyy-MM-dd')); 
                    setSelectedDate(date);
                    setOpen(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <button
            onClick={handleFilterClick}
            // className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center group transition-colors"
            className="flex items-center justify-center group bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Search
            <ArrowRight
              className="ml-2 w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 text-white transition-all duration-200"
              size={20}
            />
          </button>
        </div>
      </div>

      <MultipleImagesDoctorProps
        title="Popular Doctors"
        description="Meet With Professional Doctors."
        // handleClick={handleFilterClick}
        doctors={allDoctors}
      />
    </div>
  );
};

export default Doctors;
