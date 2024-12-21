// 'use client';
// import Header from '@/components/HomeComponent/Header';
// import MultipleImagesProps from '@/components/SinglePageImage';
// import { useDoctorStore } from '@/store/doctorStore';
// import { useEffect, useState } from 'react';
// import {
//   getCities,
//   getDepartmentData,
//   getDoctorData,
//   getDoctorFilterData,
//   getHospitalFilterData,
//   getHospitals,
//   getMedicinesData,
//   getPetData,
// } from '../../../home/action';
// import Loader from '@/components/Loader';
// import FilterDropdown from '@/components/FilterDropdown';
// import { ArrowRight } from 'lucide-react';
// import {
//   ChevronDown,
//   ChevronUp,
//   AlertCircle,
//   CalendarIcon,
// } from 'lucide-react';
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover';
// import { useCityStore } from '@/store/citiesStore';
// import { useAuthStore } from '@/store/authStore';
// import { useDepartmentStore } from '@/store/departmentStore';
// import { useSpecializationStore } from '@/store/specializationStore';
// import { usePetStore } from '@/store/petStore';
// import { useMedicineStore } from '@/store/medicinesStore';
// import { getAllSpecializations } from '@/api/route';
// import { format } from 'date-fns';
// import { Calendar } from '@/components/ui/calendar';
// import DoctorCard from '@/components/AdminPanelComponents/DoctorCard';
// import MultipleImagesDoctorProps from '@/components/DoctorComponent/doctorCardall';

// interface Doctor {
//   preSignedUrl: string;
//   image: string;
//   name: string;
//   description: string;
// }

// const Doctors = ({ params }: { params: { records: string } }) => {
//   const decodedRecords = JSON?.parse(decodeURIComponent(params?.records));
//   const [doctorNames, setDoctorNames] = useState<any[]>([]);
//   const [docName, setDocName] = useState<any>('');
//   const [docResName, setResDocName] = useState<any>(undefined);
//   const [hospitalType, setHospitalType] = useState('');
//   const [nameSpecialization, setSelectedSpecialization] = useState<any>('');
//   const [selectedDeparment, setSelectedDeparment] = useState<any>('');
//   const [selectedPet, setSelectedPet] = useState<any>('');
//   const [location, setLocation] = useState('');
//   const [hospitalName, setHospitalName] = useState('');
//   const [open, setOpen] = useState(false);
//   const [selectedDate, setSelectedDate] = useState<any>('');

//   const [searchData, setsearchData] = useState<any>('');
//   const [allDoctors, setAllDoctors, loading, setLoading] = useDoctorStore(
//     (state: any) => [
//       state.doctors,
//       state.setAllDoctors,
//       state.loading,
//       state.setLoading,
//     ]
//   );

//   const [cities, setAllCities] = useCityStore((state: any) => [
//     state.cities,
//     state.setAllCities,
//   ]);

//   const [login, setLogin, loadingAuth] = useAuthStore((state) => [
//     state.login,
//     state.setLogin,
//     state.loadingAuth,
//   ]);

//   const [departments, setAllDepartments] = useDepartmentStore((state: any) => [
//     state.departments,
//     state.setAllDepartments,
//   ]);

//   const [specialization, setAllSpecialization] = useSpecializationStore(
//     (state: any) => [state.specialization, state.setAllSpecialization]
//   );

//   const [pets, setAllPets] = usePetStore((state: any) => [
//     state.pets,
//     state.setAllPets,
//   ]);

//   const [medicines, setAllMedicines] = useMedicineStore((state: any) => [
//     state.medicines,
//     state.setAllMedicines,
//   ]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     clickFilter();
//   }, [decodedRecords]);

//   console.log('doctorsData?.recordsdoctorsDatadocName.lable', docName.label);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const petData = await getPetData();
//       const departmentData = await getDepartmentData();
//       const medicinesData = await getMedicinesData();
//       const citiesData = await getCities();
//       const specializations = await getAllSpecializations();
//       // const hospitalData = await getHospitals();
//       // const doctorsData = await getDoctorFilterData({
//       //   pageSize: 10,
//       //   pageCount: 1,
//       // });
//       const doctors = await getDoctorData();
//       // console.log("thusi",doctorsData?.records)

//       // setDoctorNames(doctors);
//       setAllMedicines(medicinesData);
//       setAllDepartments(departmentData);
//       setAllPets(petData);
//       setAllCities(citiesData);
//       setAllSpecialization(specializations);
//       // setAllDoctors(doctorsData?.records);
//       setDoctorNames(doctors);

//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   // const hospitalsOptions = Array.isArray(hospitals)
//   // ? hospitals.map((hospital: any) => ({
//   //     label: hospital.name,
//   //     value: hospital.id,
//   //   }))
//   // : [];

//   const departmentOptions = Array.isArray(departments)
//     ? departments.map((department: any) => ({
//         label: department.name,
//         value: department.id,
//       }))
//     : [];

//   const specializationOptions = Array.isArray(specialization)
//     ? specialization.map((special: any) => ({
//         label: special.specializationName,
//         value: special.id,
//       }))
//     : [];

//   // const citiesOptions = Array.isArray(cities)
//   //   ? cities.map((city: any) => {
//   //       // console.log(city)
//   //       return {
//   //         label: city.name,
//   //         value: city.id,
//   //       };
//   //     })
//   //   : [];

//   const petsOptions = Array.isArray(pets)
//     ? pets.map((pet: any) => {
//         // console.log(city)
//         return {
//           label: pet.name,
//           value: pet.id,
//         };
//       })
//     : [];

//   const listofdoctors = doctorNames.map((doctor: any) => ({
//     label: doctor.name,
//     value: doctor.id,
//   }));
//   const clickFilter = async () => {
//     try {
//       setLoading(true);
//       const doctorsData = await getDoctorFilterData({
//         pageSize: 10,
//         pageCount: 1,
//         departmentId: undefined,
//         specializationId: decodedRecords.nameSpecialization,
//         petId: undefined,
//         name: docName.lable ?docName.lable : decodedRecords.docName,
//         date: decodedRecords.selectedDate,
//       });

//       setAllDoctors(doctorsData?.records);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
//   const doctores = Array.isArray(allDoctors)
//     ? allDoctors.map((doctor: Doctor) => ({
//         src: doctor.preSignedUrl,
//         alt: doctor.image,
//         textOverlay: doctor.name,
//         imageDescription: doctor.description,
//         label: doctor.name,
//       }))
//     : [];

//   const handleClick = (imageName: string) => {
//     console.log(`Image clicked: ${imageName}`);
//   };
//   const handleDateChange = (e: any) => {
//     const inputDate = e.target.value;
//     setsearchData(inputDate);
//   };

//   if (loading || !allDoctors) {
//     return (
//       <div className="mt-14 px-7 w-full h-full flex flex-col bg-gray-100 items-center py-4">
//         <div className="w-full max-w-[1204px] justify-center items-center flex flex-col px-3 py-5 h-full rounded-lg">
//           <Loader className="h-10 w-10" />
//         </div>
//       </div>
//     );
//   }

//   const handleSearch = () => {
//     // if (!hospitalName && !specialization && !doctorName) {
//     //   setShowError(true);
//     //   return;
//     // }
//     // setShowError(false);
//     // onSearch({
//     //   hospitalType,
//     //   location,
//     //   hospitalName,
//     //   specialization,
//     //   gender,
//     //   sessionTime,
//     //   date,
//     //   priceRange,
//     //   doctorName,
//     // });
//   };

//   return (
//     <div id="doctors" className="pb-8 pt-3 w-full">
//       {/*

//       <div className="bg-white rounded-lg mt-10 w-full shadow-md p-6 mb-8">
//         <h3 className="text-2xl font-bold mb-4">Hospital properties found</h3>
//         <hr className="my-4 border-t-2 border-gray-300" />

//         <div className="flex justify-end items-center gap-6">
//           {/* <FilterDropdown
//             options={doctors?.map((d: any) => ({
//               label: d.name,
//               value: d.id,
//             }))}
//             placeholder="🐾 Select Pet"
//             onChange={setPetName}
//             value={petName}
//           /> */}
//       {/* <FilterDropdown
//             options={doctorNames}
//             placeholder="👩‍⚕️ Select Doctor"
//             onChange={setDocName}
//             value={docName}
//           /> */}

//       {/* <Calendar
//             mode="single"
//             selected={selectedDate}
//             onSelect={setSelectedDate}
//             initialFocus
//           /> */}
//       {/* <DatePicker
//             selectedDate={selectedDate}
//             onChange={setSelectedDate}
//             placeholder="📅 Select Date"
//           /> */}

//       {/* Search Button */}
//       {/* <button
//             onClick={fetchData}
//             className="bg-blue-600 text-white px-8 py-2.5 w-64 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Search
//           </button> */}
//       {/* </div>
//       </div>
//  */}
//       {/* */}

//       <div className="bg-white rounded-lg shadow-lg mt-10 p-6">
//         <hr className="my-4 border-t-2 border-gray-300" />

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
//           <input
//             type="text"
//             placeholder="Search doctors"
//             value={docName}
//             onChange={handleDateChange}
//             className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           />

//           {/* <FilterDropdown
//                 options={hospitalsOptions}
//                 placeholder="👩‍⚕️ Select Doctor"
//                 onChange={setDocName}
//                 value={docName}
//               /> */}

//           {/* <FilterDropdown
//                 options={citiesOptions}
//                 placeholder="📍 Location"
//                 onChange={setLocation}
//                 value={location}
//               /> */}
//           {/* <FilterDropdown
//                 options={genderOptions}
//                 placeholder="Gender"
//                 onChange={setGender}
//                 value={gender}
//               /> */}
//           <FilterDropdown
//             options={specializationOptions}
//             placeholder="👩‍⚕️ Select Specialization"
//             onChange={setSelectedSpecialization}
//             value={nameSpecialization}
//           />

//           <FilterDropdown
//             options={departmentOptions}
//             placeholder="👩‍⚕️ Select Department"
//             onChange={setSelectedDeparment}
//             value={selectedDeparment}
//           />

//           <FilterDropdown
//             options={petsOptions}
//             placeholder="👩‍⚕️ Select Pet"
//             onChange={setSelectedPet}
//             value={selectedPet}
//           />

//           <div className="relative">
//             <Popover open={open} onOpenChange={setOpen}>
//               <PopoverTrigger asChild>
//                 <button className="bg-white border border-gray-500 rounded-lg px-4 py-2 w-full flex justify-between items-center text-sm font-medium hover:bg-gray-50">
//                   {selectedDate
//                     ? format(selectedDate, 'PPP')
//                     : '📅 Select Date'}
//                   <CalendarIcon className="h-4 w-4 text-gray-500" />
//                 </button>
//               </PopoverTrigger>
//               <PopoverContent align="start" className="p-0 z-50">
//                 <Calendar
//                   mode="single"
//                   selected={selectedDate}
//                   onSelect={(date) => {
//                     setSelectedDate(date);
//                     setOpen(false);
//                   }}
//                   initialFocus
//                 />
//               </PopoverContent>
//             </Popover>
//           </div>

//           <button
//             onClick={handleSearch}
//             // className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center group transition-colors"
//             className="flex items-center justify-center group bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
//           >
//             Search
//             <ArrowRight
//               className="ml-2 w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 text-white transition-all duration-200"
//               size={20}
//             />
//           </button>
//         </div>
//       </div>
//       <MultipleImagesDoctorProps
//         title="Popular Doctors"
//         description="Meet With Professional Doctors."
//         handleClick={clickFilter}
//         doctors={allDoctors}
//       />

//     </div>
//   );
// };

// export default Doctors;

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
} from '../../../../home/action';
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
import MultipleImagesDoctorProps from '@/components/DoctorComponent/doctorCardall';
import { ArrowRight, CalendarIcon } from 'lucide-react';
import { getAllSpecializations } from '@/api/route';
import { Calendar } from '@/components/ui/calendar';

interface Doctor {
  preSignedUrl: string;
  image: string;
  name: string;
  description: string;
}

interface FilterOptions {
  name?: any;
  departmentId?: any;
  petId?: any;
  specializationId?: any;
  date?: any;
}

const DoctorsWithSerachParam = ({
  params,
}: {
  params: { records: string };
}) => {
  const decodedRecords = JSON.parse(decodeURIComponent(params?.records));
  const [filters, setFilters] = useState<FilterOptions>({
    specializationId: decodedRecords.specializationId,
    name: decodedRecords.name,
    date: decodedRecords.date,
  });
  const [open, setOpen] = useState(false);

  const [doctorNames, setDoctorNames] = useState([]);
  const [selectedDate, setSelectedDate] = useState<any>(null);

  // Store states
  const [allDoctors, setAllDoctors, loading, setLoading] = useDoctorStore(
    (state: any) => [
      state.doctors,
      state.setAllDoctors,
      state.loading,
      state.setLoading,
    ]
  );

  const [cities, setAllCities] = useCityStore((state: any) => [
    state.cities,
    state.setAllCities,
  ]);

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

  const [medicines, setAllMedicines] = useMedicineStore((state: any) => [
    state.medicines,
    state.setAllMedicines,
  ]);

  const dropdownOptions = {
    departments: departments.map((department: any) => ({
      label: department.name,
      value: department.id,
    })),
    specializations: specialization.map((special: any) => ({
      label: special.specializationName,
      value: special.id,
    })),
    pets: pets.map((pet: any) => ({
      label: pet.name,
      value: pet.id,
    })),
  };

  const handleSearchChange = debounce((value: string) => {
    setFilters((prev) => ({ ...prev, name }));
  }, 300);

  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
    setFilters((prev) => ({
      ...prev,
      date: date ? format(date, 'yyyy-MM-dd') : undefined,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [
          petData,
          departmentData,
          medicinesData,
          citiesData,
          specializations,
          doctors,
        ] = await Promise.all([
          getPetData(),
          getDepartmentData(),
          getMedicinesData(),
          getCities(),
          getAllSpecializations(),
          getDoctorData(),
        ]);

        setAllPets(petData);
        setAllDepartments(departmentData);
        setAllMedicines(medicinesData);
        setAllCities(citiesData);
        setAllSpecialization(specializations);
        setDoctorNames(doctors);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    setAllPets,
    setAllDepartments,
    setAllMedicines,
    setAllCities,
    setAllSpecialization,
  ]);

  const fetchFilteredDoctors = useCallback(
    async (filters: FilterOptions) => {
      setLoading(true);
      try {
        const doctorsData = await getDoctorFilterData({
          pageSize: 10,
          pageCount: 1,
          ...filters,
        });
        setAllDoctors(doctorsData?.records || []);
      } catch (error) {
        console.error('Error fetching filtered doctors:', error);
      } finally {
        setLoading(false);
      }
    },
    [setAllDoctors, setLoading]
  );

  useEffect(() => {
    fetchFilteredDoctors(filters);
  }, [filters, fetchFilteredDoctors]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div id="doctors" className="pb-8 pt-3 w-full">
      <div className="bg-white rounded-lg shadow-lg mt-28 p-6 w-full container  px-0 md:px-7 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        
        
          {/* Doctor Search */}
        
{/*         
        
          <input
            type="text"
            placeholder="Search doctors"
            onChange={(e) => handleSearchChange(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          /> */}


          
{/* 
          Specialization Filter
          <FilterDropdown
            options={dropdownOptions.specializations}
            placeholder="👩‍⚕️ Select Specialization"
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, specializationId: value }))
            }
            value={filters.specializationId}
          /> */}

          {/* Department Filter */}
          <FilterDropdown
            options={dropdownOptions.departments}
            placeholder="🏥 Select Department"
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, departmentId: value }))
            }
            value={filters.departmentId}
          />

          {/* Pet Filter */}
          <FilterDropdown
            options={dropdownOptions.pets}
            placeholder="🐾 Select Pet"
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, petId: value }))
            }
            value={filters.petId}
          />

          {/* Date Filter */}

{/* 
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button className="bg-white border border-gray-500 rounded-lg px-4 py-2 w-full flex justify-between items-center text-sm font-medium hover:bg-gray-50">
                {selectedDate ? format(selectedDate, 'PPP') : '📅 Select Date'}
                <CalendarIcon className="h-4 w-4 text-gray-500" />
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="p-0 z-50">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date: any) => handleDateSelect(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
 */}


        </div>
      </div>

      <MultipleImagesDoctorProps
        title="Popular Doctors"
        description="Meet With Professional Doctors."
        handleClick={(doctor) => console.log('Doctor clicked:', doctor)}
        doctors={allDoctors}
      />
    </div>
  );
};

export default DoctorsWithSerachParam;
