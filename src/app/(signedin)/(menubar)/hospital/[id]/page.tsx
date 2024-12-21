
'use client';

import React, { useEffect, useState } from 'react';
import { getByIdHospital, getDoctorFilterData } from '@/app/home/action';
import { useHospitalStore } from '@/store/hospitalStore';
import { useRouter } from 'next/navigation';
import DocBook from '@/components/ui/docBook';
import FilterDropdown from '@/components/FilterDropdown';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, CloudFog } from 'lucide-react';
import { useAdminStore } from '@/store/adminStore';
import { useDoctorStore } from '@/store/doctorStore';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { getAllPets } from '@/app/admin/pets/action';
import { usePetStore } from '@/store/petStore';
import Pets from '../../pets/page';

const Index = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [docName, setDocName] = useState<any>('');
  const [nameSpecialization, setSelectedSpecialization] = useState<any>('');

  const [petName, setPetName] = useState<any>(''); // State for pet name
  const [selectedDate, setSelectedDate] = useState<any>(''); // State for selected date
  const [hospitalResName, setResHospitalName] = useState<any>(undefined);
  const [doctorNames, setDoctorNames] = useState<any[]>([]);

  const [
    selectedHospital,
    setSelectedHospital,
    departments,
    doctors,
    medicines,
    doctorsinhospital,
    setDoctors,
    specializationinhospital,
    setSpecialization,
    setLoading,
  ] = useHospitalStore((state) => [
    state.selectedHospital,
    state.setSelectedHospital,
    state.departments,
    state.doctors,
    state.medicines,
    state.doctorsinhospital,
    state.setDoctors,
    state.specializationinhospital,
    state.setSpecialization,
    state.setLoading,
  ]);
  const [pet, setAllPet] = usePetStore((state: any) => [
    state.pet,
    state.setAllPet,
  ]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getByHospitalDetails();
  }, []);

  useEffect(() => {
    // doctorFilter();
  }, [  nameSpecialization.value,
    petName.value,
    selectedDate]);

  const getByHospitalDetails = async () => {
    try {
      setLoading(true);
      const getByHospital = await getByIdHospital(params?.id);
      const pets = await getAllPets();

      const DoctorData = await getByIdHospital(params?.id);
      setSelectedHospital(getByHospital);
      setAllPet(pets);

   

      const doctorNames =
        DoctorData?.doctorDepartmentResponses.flatMap((department: any) =>
          department?.doctorResponses.map((doctor: any) => ({
            label: doctor.name, // Doctor name
            value: doctor.id, // Doctor ID
          }))
        ) || [];

      const SpecializationNames =
        DoctorData?.doctorDepartmentResponses.flatMap((department: any) =>
          department?.doctorResponses.map((doctor: any) => ({
            label: doctor.specializationName, // Doctor name
            value: doctor.id,
          }))
        ) || [];

      setDoctors(doctorNames);
      setSpecialization(SpecializationNames);
    } catch (error) {
      console.error(error);
    }
  };



const formatDate = (date:any) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
};

const formattedDate = formatDate(selectedDate);


const doctorFilter = async () => {
  try {
    setLoading(true);

    // Log parameters
    const requestData = {
      pageSize: 10,

      pageCount: 1,
      name: docName.label ,
      // departmentId: undefined,
      petId: petName?.value,
      specializationId: nameSpecialization?.value,
      date: formattedDate,
    };
    console.log('Request Data:', requestData);

    const searchTextData = await getDoctorFilterData(requestData);

    console.log('Full API Response:', searchTextData);

    if (searchTextData) {
      console.log('Search Data:', searchTextData?.data);
    } else {
      console.warn('API returned undefined response.');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    setLoading(false);
  }
};

const handleClick = (imageName: any) => {
    console.log(`${imageName} clicked!`);
  };

  return (
    <div id="hospitals" className="pb-8 w-full pt-20">
      <div className="bg-white rounded-lg w-full shadow-md p-6 mb-8">
        <h3 className="text-2xl font-bold mb-4">Hospital properties found</h3>
        <hr className="my-4 border-t-2 border-gray-300" />

        <div className="flex justify-end items-center gap-6">
        <FilterDropdown
            options={pet?.map((d: any) => ({
              label: d.name,
              value: d.id,
            }))}
            placeholder="🐾 Select Pet"
            onChange={setPetName}
            value={petName}
          /> 
          <FilterDropdown
            options={doctorsinhospital}
            placeholder="👩‍⚕️ Select Doctor"
            onChange={setDocName}
            value={docName}
          />

          <FilterDropdown
            options={specializationinhospital}
            placeholder="👩‍⚕️ Select Specialization"
            onChange={setSelectedSpecialization}
            value={nameSpecialization}
          />

          <div className="relative">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button className="bg-white border border-gray-500 rounded-lg px-4 py-2 w-full flex justify-between items-center text-sm font-medium hover:bg-gray-50">
                  {selectedDate
                    ? format(selectedDate, 'PPP')
                    : '📅 Select Date'}
                  <CalendarIcon className="h-4 w-4 text-gray-500" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="start" className="p-0 z-50">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date); // Update selected date state
                    setOpen(false); // Close the calendar after selection
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <button
            onClick={doctorFilter}
            className="bg-blue-600 text-white px-8 py-2.5 w-64 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      </div>
      {/* <div className="mt-8 bg-white rounded-lg w-full shadow-md p-6 mb-8"> */}
      <div className="w-full mt-4">
        <DocBook
          doctors={doctors}
          defaultImage="/department.png"
          pathname="/appointmentdoctor"
          doctor={true}
          handleClick={handleClick}
        />
      </div>
      {/* </div> */}
    </div>
  );
};

export default Index;
