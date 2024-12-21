// 'use client';
// import { signOut } from '@/api/route';
// import { useEffect, useState, useCallback } from 'react';
// import Image from 'next/image';
// import Logo from '../../public/logowhite.png';
// import Logoeffect from '../../public/stubby.png';
// import booking from '../../public/booking.png';
// import { useRouter } from 'next/navigation';
// import { useDoctorStore } from '@/store/doctorStore';
// import {
//   getCities,
//   getDepartmentData,
//   getDoctorData,
//   getMedicinesData,
//   getPetData,
// } from '@/app/home/action';
// import FilterDropdown from '@/components/FilterDropdown';
// import PopularDoctors from '@/components/Image';
// import { useAuthStore } from '@/store/authStore';
// import { useDepartmentStore } from '@/store/departmentStore';
// import { useMedicineStore } from '@/store/medicinesStore';
// import { usePetStore } from '@/store/petStore';
// import doc from '../../public/doc.png';

// export default function Home() {
//   const [doctorName, setDoctorName] = useState<string>('');
//   const [cityName, setCityName] = useState<any>('');
//   const [searchData, setsearchData] = useState('');
//   const [cityData, setCitiesData] = useState('');
//   const [login, setLogin] = useAuthStore((state) => [
//     state.login,
//     state.setLogin,
//   ]);
//   const [doctors, setAllDoctors] = useDoctorStore((state: any) => [
//     state.doctors,
//     state.setAllDoctors,
//   ]);
//   const [departments, setAllDepartments] = useDepartmentStore((state: any) => [
//     state.departments,
//     state.setAllDepartments,
//   ]);
//   const [pets, setAllPets] = usePetStore((state: any) => [
//     state.pets,
//     state.setAllPets,
//   ]);
//   const [medicines, setAllMedicines] = useMedicineStore((state: any) => [
//     state.medicines,
//     state.setAllMedicines,
//   ]);

//   const doctorOptions = Array.isArray(doctors)
//     ? doctors.map((doctor: any) => ({
//         label: doctor.name,
//         value: doctor.id,
//       }))
//     : [];

//   const departmentOptions = Array.isArray(departments)
//     ? departments.map((department: any) => ({
//         label: department.name,
//         value: department.id,
//       }))
//     : [];

//   const citiesOptions = Array.isArray(cityData)
//     ? cityData.map((city: any) => ({
//         label: city.name,
//         value: city.id,
//       }))
//     : [];

//   const [headerBg, setHeaderBg] = useState('bg-transparent');
//   const [textColor, setTextColor] = useState('text-white'); // Default text color
//   const [logo, setLogo] = useState(Logo); // Default logo

//   const fetchData = useCallback(async () => {
//     try {
//       const petData = await getPetData();
//       const departmentData = await getDepartmentData();
//       const doctorData = await getDoctorData();
//       const medicinesData = await getMedicinesData();
//       const citiesData = await getCities();

//       setAllMedicines(medicinesData);
//       setAllDepartments(departmentData);
//       setAllPets(petData);
//       setAllDoctors(doctorData);
//       setCitiesData(citiesData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   }, [
//     setAllMedicines,
//     setAllDepartments,
//     setAllPets,
//     setAllDoctors,
//     setCitiesData,
//   ]);

//   const handleClick = (imageName: any) => {
//     // console.log(`${imageName} clicked!`);
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollY = window.scrollY;
//       if (scrollY > 0) {
//         setHeaderBg('bg-white bg-opacity-90');
//         setTextColor('text-black');
//         setLogo(Logoeffect);
//       } else {
//         setHeaderBg('bg-transparent');
//         setTextColor('text-white');
//         setLogo(Logo);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);

//     // Fetch data on mount
//     fetchData();

//     // Clean up the event listener
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [fetchData]); // Include fetchData in the dependency array

//   const departmentDatas = Array.isArray(departments)
//     ? departments.map((department: any) => ({
//         src: department.preSignedUrl,
//         alt: department.image,
//         textOverlay: department.name,
//         id: department.id,
//       }))
//     : [];

//   const petdata = Array.isArray(pets)
//     ? pets.map((pet: any) => ({
//         src: pet.preSignedUrl,
//         alt: pet.image,
//         textOverlay: pet.name,
//         id: pet.id,
//       }))
//     : [];

//   const [loading, setLoading] = useState<boolean>(false);

//   const router = useRouter();

//   const medicinesDatas = Array.isArray(medicines)
//     ? medicines.map((medicines: any) => ({
//         id: medicines.id,
//         src: medicines.preSignedUrl,
//         alt: medicines.image,
//         textOverlay: medicines.name,
//         label: medicines.name,
//       }))
//     : [];

//   const handleDateChange = (e: any) => {
//     const inputDate = e.target.value;
//     setsearchData(inputDate);
//   };

//   if (loading) {
//     return <div>Loading ....!</div>;
//   }

//   const handleFilter = async () => {
//     const result = {
//       searchData: searchData,
//       cityId: cityName.value,
//     };
//     const encodedRecords = JSON.stringify(result);
//     if (searchData || cityName) {
//       await router.push(`/hospitals/${encodedRecords}`);
//     }
//   };

//   return (
//     <>
//       <main className="bg-gray-50">
//         <div className="flex flex-col items-center justify-between">
//           <section className="relative h-[100dvh] w-full flex items-center justify-center p-4">
//             <div className="absolute inset-0 overflow-hidden z-0">
//               <div className="relative h-full w-full">
//                 <video
//                   autoPlay
//                   loop
//                   muted
//                   className="absolute inset-0 w-full h-full object-cover"
//                   style={{ objectFit: 'cover' }}
//                 >
//                   <source src="/Logvideo.mp4" type="video/mp4" />
//                 </video>
//                 <div className="absolute inset-0 bg-black opacity-60"></div>{' '}
//                 {/* Black shadow overlay */}
//               </div>
//             </div>
//             <div className="relative z-3 flex flex-col items-center text-center py-16">
//               <div className="relative py-16">
//                 <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
//                   {/* Left side content */}
//                   <div className="text-center md:text-left">
//                     <h3 className="text-3xl md:text-5xl font-bold text-red-500 mb-4">
//                       Emergency?
//                     </h3>
//                     <h1 className="text-4xl md:text-6xl font-bold text-blue-100 mb-4">
//                       Find Nearest Medical Facility
//                     </h1>
//                     <div className="flex gap-4 justify-center md:justify-start mt-6">
//                       <button
//                         className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
//                         onClick={() => router.push('/viewallhospi')}
//                       >
//                         View Hospitals
//                       </button>
//                       <button
//                         className="bg-blue-100 text-blue-600 px-6 py-3 rounded-lg shadow hover:bg-blue-200"
//                         onClick={() => router.push('/doctors')}
//                       >
//                         View Doctors
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//           <div className="relative z-5 w-full px-4 pb-8 -mt-20 max-w-6xl mx-auto">
//             <div className="flex flex-row justify-between space-x-4">
//               {/* Search Component */}
//               <div className="bg-white rounded-lg shadow-lg p-4 flex-grow flex-shrink-0 w-full md:w-2/3">
//                 <div className="bg-white">
//                   <div className="container mx-auto">
//                     <h3 className=" text-2xl font-bold mb-4">
//                       Start Your Search
//                     </h3>
//                     <hr className="my-4 border-t-2 border-gray-300" />

//                     <div className="relative z-2 home-first w-full pt-4">
//                       <section className="mb-8">
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
//                           <input
//                             type="text"
//                             placeholder="Search doctors, clinics, hospitals, etc."
//                             value={searchData}
//                             onChange={handleDateChange}
//                             className="block min-w-16 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                           />
//                           <FilterDropdown
//                             options={citiesOptions}
//                             placeholder="Select Location"
//                             onChange={(selectedOption: any) => {
//                               setCityName(selectedOption);
//                             }}
//                             value={cityName}
//                           />

//                           <button
//                             onClick={handleFilter}
//                             className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                           >
//                             Search
//                           </button>
//                         </div>
//                       </section>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Join As Doctor Component */}
//               <div className="bg-gray-200  rounded-lg shadow-lg p-4 flex-grow flex-shrink-0 w-full md:w-1/3">
//                 <div className="flex items-center">
//                   <Image
//                     src={booking}
//                     alt="Your Image"
//                     className="w-1/2 h-auto object-cover rounded-lg -mt-10"
//                   />
//                   <div className="flex-grow pl-4">
//                     <h3 className="text-lg font-bold">
//                       Are You Make an Appointment
//                     </h3>
//                     <button
//                       className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 mt-4"
//                       onClick={() => router.push('/Appointments')}
//                     >
//                       Appointment
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div id="departments" className="pb-8 pt-20">
//           <PopularDoctors
//             title="Departments"
//             description="Your Pets Nutritional Health is Very Important & Our Priority"
//             link="/departments"
//             handleClick={handleClick}
//             linkDescription={'Departments'}
//             doctors={departments.slice(0, 4)}
//             pathname={'/departments'}
//             query={departmentDatas}
//           />
//         </div>
//         <div>
//           <section className="flex flex-col items-center py-12 z-5 w-full px-4 pb-8 max-w-6xl mx-auto">
//             <div className="flex flex-row justify-between items-center w-full">
//               <div className=" m1 flex-1 text-center">
//                 <h1 className="text-4xl font-bold leading-snug">
//                   Find Pet Healthcare Near You with
//                   <span className="text-red-500"> One Click</span>
//                 </h1>
//                 <p className="mt-4 text-gray-600">
//                   Find the nearest hospital with ease.
//                   <br />
//                   Get instant access to healthcare services in your area,
//                   <br />
//                   right from the comfort of your home.
//                 </p>
//                 <div className="mt-6 space-x-4">
//                   <button className="bg-white border border-blue-500 text-blue-500 py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition">
//                     Nearest Hospital
//                   </button>
//                 </div>
//               </div>

//               <div className="relative m2 flex-1 flex items-center justify-center">
//                 <Image
//                   src={doc}
//                   alt="Dr. Tyrone Grindle"
//                   width={300}
//                   height={400}
//                   className="rounded-lg "
//                 />
//                 <div className="absolute bottom-0 bg-blue-900 text-white p-3 rounded-md shadow-lg ml-80 transform -translate-x-1/2 border-r-2 border-red-500">
//                   <p className="text-sm">Greetings & Welcome to</p>
//                   <p className="text-lg font-bold text-center">STUBBY</p>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </div>

//         <div id="doctors" className="pb-8 pt-20">
//           <PopularDoctors
//             title="Popular Doctors"
//             description="Meet With Professional Doctors."
//             link="/doctors"
//             handleClick={handleClick}
//             linkDescription="Doctors"
//             doctors={doctors.slice(0, 4)}
//             pathname={'/appointmentdoctor'}
//             query={doctors}
//             doctor={true}
//           />
//         </div>
//         <div id="pets" className="pb-8 pt-20">
//           <PopularDoctors
//             title="Pets Nutritional"
//             description="Your Pets Nutritional Health is Very Important & Our Priority"
//             link="/pets"
//             handleClick={handleClick}
//             linkDescription={'Pets'}
//             doctors={pets.slice(0, 4)}
//             pathname={'/pets'}
//             query={petdata}
//           />
//         </div>
//       </main>
//     </>
//   );
// }



'use client';
import { getAllSpecializations, signOut } from '@/api/route';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Logo from '../../public/logowhite.png';
import Logoeffect from '../../public/stubby.png';
import booking from '../../public/booking.png';
import { useRouter } from 'next/navigation';
import { useDoctorStore } from '@/store/doctorStore';
import {
  getCities,
  getDepartmentData,
  gethospitalFilterAllData,
  getHospitals,
  getMedicinesData,
  getPetData,
} from '@/app/home/action';
import FilterDropdown from '@/components/FilterDropdown';
import PopularDoctors from '@/components/Image';
import { useAuthStore } from '@/store/authStore';
import { useDepartmentStore } from '@/store/departmentStore';
import { useMedicineStore } from '@/store/medicinesStore';
import { usePetStore } from '@/store/petStore';
import doc from '../../public/doc.png';
import { ArrowRight, CalendarIcon, HeartPulse, Hospital } from 'lucide-react';
import { useSpecializationStore } from '@/store/specializationStore';
import { useHospitalStore } from '@/store/hospitalStore';
import { useCityStore } from '@/store/citiesStore';
// import SpecialistCard from '@/components/HomeComponent/doctorcard';
// import AdvancedSearchFilter from '@/components/HomeComponent/AdvancedSearchFilter';
// import ServiceCard from '@/components/HomeComponent/ServiceCard';
import { getDoctorData } from './admin/doctors/action';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import SpecialistCard from '@/components/HomeComponent/doctorcard';
import ServiceCard from '@/components/HomeComponent/ServiceCard';
import AdvancedSearchFilter from '@/components/HomeComponent/AdvancedSearchFilter';

export default function Home() {
  const [doctorName, setDoctorName] = useState<string>('');
  const [cityName, setCityName] = useState<any>();
  const [hospitalName, setHospitalName] = useState<any>('');
  const [specializationName, setSpecializationName] = useState<any>('');
  const [selectedDay, setSelectedDay] = useState<any>(null);
  const [docName, setDocName] = useState<any>('');
  const [docResName, setResDocName] = useState<any>(undefined);
  const [hospitalType, setHospitalType] = useState('');
  const [nameSpecialization, setSelectedSpecialization] = useState<any>('');
  const [selectedDeparment, setSelectedDeparment] = useState<any>('');
  const [selectedPet, setSelectedPet] = useState<any>('');
  const [searchData, setsearchData] = useState<any>('');
  console.log('selectedDayselectedDayselectedDay', selectedDay?.value);
  const [cities, setAllCities] = useCityStore((state: any) => [
    state.cities,
    state.setAllCities,
  ]);

  const [login, setLogin, loadingAuth] = useAuthStore((state) => [
    state.login,
    state.setLogin,
    state.loadingAuth,
  ]);
  const [doctors, setAllDoctors] = useDoctorStore((state: any) => [
    state.doctors,
    state.setAllDoctors,
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

  const specializationOptions = Array.isArray(specialization)
    ? specialization.map((special: any) => ({
        label: special.specializationName,
        value: special.id,
      }))
    : [];

  const [
    hospitals,
    setAllHospitals,
    setFilterAllHospitals,
    filterAllHspitals,
    loading,
    setLoading,
  ] = useHospitalStore((state: any) => [
    state.hospitals,
    state.setAllHospitals,
    state.setFilterAllHospitals,
    state.filterAllHspitals,

    state.loading,
    state.setLoading,
  ]);

  const hospitalsOptions = Array.isArray(hospitals)
    ? hospitals.map((hospital: any) => ({
        label: hospital.name,
        value: hospital.id,
      }))
    : [];

  const departmentOptions = Array.isArray(departments)
    ? departments.map((department: any) => ({
        label: department.name,
        value: department.id,
      }))
    : [];

  const citiesOptions = Array.isArray(cities)
    ? cities.map((city: any) => {
        // console.log(city)
        return {
          label: city.name,
          value: city.id,
        };
      })
    : [];

  const petsOptions = Array.isArray(pets)
    ? pets.map((pet: any) => {
        // console.log(city)
        return {
          label: pet.name,
          value: pet.id,
        };
      })
    : [];

  const daysOfWeekOptions = [
    { value: 'MONDAY', label: 'Monday' },
    { value: 'TUESDAY', label: 'Tuesday' },
    { value: 'WEDNESDAY', label: 'Wednesday' },
    { value: 'THURSDAY', label: 'Thursday' },
    { value: 'FRIDAY', label: 'Friday' },
    { value: 'SATURDAY', label: 'Saturday' },
    { value: 'SUNDAY', label: 'Sunday' },
  ];
  const fetchData = async () => {
    try {
      const petData = await getPetData();
      const departmentData = await getDepartmentData();
      const data = await getDoctorData(1, 10, undefined, undefined, undefined);
      const medicinesData = await getMedicinesData();
      const citiesData = await getCities();
      const specializations = await getAllSpecializations();
      const hospitalData = await getHospitals();
      const hosptaltData = await gethospitalFilterAllData({
        pageSize: 10,
        pageCount: 1,
      });

      setAllPets(petData);
      setAllDepartments(departmentData);

      setAllDoctors(data.records);
      setAllMedicines(medicinesData);

      setAllCities(citiesData);
      setAllSpecialization(specializations);
      setAllHospitals(hospitalData);
      setFilterAllHospitals(hosptaltData?.records);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (imageName: any) => {};

  const doctores = Array.isArray(doctors)
    ? doctors.map((doctor: any) => ({
        id: doctor.id,
        src: doctor.preSignedUrl,
        alt: doctor.image,
        textOverlay: doctor.name,
        description: doctor.description,
        specializationName: doctor.specializationName,
        dayTimeSlotResponses: doctor.dayTimeSlotResponses,
      }))
    : [];
  const hospitalDatas = Array.isArray(filterAllHspitals)
    ? filterAllHspitals.map((hospital: any) => ({
        src: hospital.preSignedUrl,
        alt: hospital.image,
        textOverlay: hospital.name,
        id: hospital.id,
      }))
    : [];

  const petdata = Array.isArray(pets)
    ? pets.map((pet: any) => ({
        src: pet.preSignedUrl,
        alt: pet.image,
        textOverlay: pet.name,
        id: pet.id,
      }))
    : [];

  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<any>('');

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const medicinesDatas = Array.isArray(medicines)
    ? medicines.map((medicines: any) => ({
        id: medicines.id,
        src: medicines.preSignedUrl,
        alt: medicines.image,
        textOverlay: medicines.name,
        label: medicines.name,
      }))
    : [];

  const handleMouseEnter = useCallback(
    (view: string) => setActiveDropdown(view),
    []
  );
  const handleMouseLeave = useCallback(() => setActiveDropdown(null), []);

  const navigate = (link: string) => router.push(link);

  const renderDropdown = (items: any[], hrefBase: string) => (
    <div className="absolute bg-white shadow-md mt-2 w-48">
      <hr className="my-2" />
      <ul className="flex flex-col space-y-2">
        {items &&
          Array.isArray(items) &&
          items.map(
            (item, index) =>
              item && (
                <li key={index}>
                  <a
                    href={`${hrefBase}/${item.name}`}
                    className="text-gray-600 block px-4 py-2"
                  >
                    {item.name}
                    <hr className="mt-2" />
                  </a>
                </li>
              )
          )}
      </ul>
    </div>
  );

  const formatDate = (date: any) => {
    const [month, day, year] = date.split('/');
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (e: any) => {
    const inputDate = e.target.value;
    setDocName(inputDate);
  };

  if (loading && loadingAuth) {
    return <div>Loading ....!</div>;
  }

  const handleFilter = async () => {
    // const searchTextData = await getHospitalFilterData({
    //   pageSize: 10,
    //   pageCount: 1,
    //   searchTerm: searchData,
    // });
    // const result = searchTextData?.records.map((record: any) => ({
    //   id: record?.id,
    // }));

    const result = {
      cityId: cityName?.value,
      hospitalId: hospitalName?.value,
      specializationId: specializationName?.value,
      day: selectedDay?.value,
    };
    const encodedRecords = JSON.stringify(result);
    if (cityName || hospitalName || specializationName || selectedDay) {
      await router.push(`/hospitals/${encodedRecords}`);
    }
    setSelectedDay('');
    setCityName('');
    setHospitalName('');
  };

  const handleSearch = async () => {
    const requestData = {
      name: docName,
      departmentId: undefined,
      petId: undefined,
      specializationId: nameSpecialization?.value,
      date: selectedDate,
    };
    console.log('Request Datathursika...:', requestData);

    const encodedRecords = JSON.stringify(requestData);
    if (docName || nameSpecialization || selectedDate) {
      console.log('thursika', encodedRecords);
      await router.push(`/doctors/${encodedRecords}`);
    }
    setSelectedDay('');
    setCityName('');
    setHospitalName('');
  };

  return (
    <>
      <main className="bg-gray-50">
        <div className="flex flex-col items-center justify-between">
          <section className="relative h-[100dvh] w-full flex items-center justify-center p-4">
            <div className="absolute inset-0 overflow-hidden z-0">
              <div className="relative h-full w-full">
                <video
                  autoPlay
                  loop
                  muted
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectFit: 'cover' }}
                >
                  <source src="/Logvideo.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black opacity-60"></div>{' '}
                {/* Black shadow overlay */}
              </div>
            </div>
            <div className="relative z-3 flex flex-col items-center text-center py-16">
              <div className="relative py-16">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                  <div className="text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-bold text-blue-100 mb-4">
                      Find Pet Healthcare Near You with
                    </h1>
                    <h3 className="text-3xl md:text-5xl font-bold text-red-500 mb-4">
                      One Click
                    </h3>
                    {/* <h1 className="text-4xl md:text-6xl font-bold text-blue-100 mb-4">
                      Find Nearest Medical Facility
                    </h1> */}
                    <h1 className="text-xl md:text-2xl font-medium text-blue-100 mb-4">
                      Find the nearest hospital with ease.
                      <br />
                      Get instant access to healthcare services in your area,
                      <br />
                      right from the comfort of your home.
                    </h1>
                    <div className="flex gap-4 justify-center md:justify-start mt-6">
                      {/* <button
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
                        onClick={() => router.push('/viewallhospi')}
                      >
                        View Hospitals
                      </button> */}
                      <button
                        className="bg-blue-100 text-blue-600 px-6 py-3 rounded-lg shadow hover:bg-blue-200"
                        onClick={() => router.push('/viewalldoctors')}
                      >
                        View Doctors
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="relative z-5 w-full px-4 pb-8 -mt-20 max-w-6xl mx-auto">
            <div className="flex flex-row justify-between space-x-4">
              <div className="bg-white rounded-lg shadow-lg p-4 flex-grow flex-shrink-0 w-full md:w-2/3">
                <div className="bg-white">
                  <div className="container mx-auto">
                    <h3 className=" text-2xl font-bold mb-4">
                      Start Your Search Hospital
                    </h3>
                    <hr className="my-4 border-t-2 border-gray-300" />

                    <div className="relative z-2 home-first w-full pt-4">
                      <section className="mb-8">
                        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-4"> */}
                        {/* <input
        type="text"
        placeholder="Search doctors, clinics, hospitals, etc."
        value={searchData}
        onChange={handleDateChange}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      /> */}

                        {/* <FilterDropdown
                            options={citiesOptions}
                            placeholder="📍 Select Location"
                            onChange={(selectedOption: any) => {
                              setCityName(selectedOption);
                            }}
                            value={cityName}
                          />

                          <FilterDropdown
                            options={hospitalsOptions}
                            placeholder="🏥 Select Hospital"
                            onChange={(selectedOption: any) => {
                              setHospitalName(selectedOption);
                            }}
                            value={hospitalName}
                          />

                          <FilterDropdown
                            options={daysOfWeekOptions}
                            placeholder="🗓 Select Day"
                            onChange={(selectedOption: any) =>
                              setSelectedDay(selectedOption)
                            }
                            value={selectedDay}
                          />
                          <FilterDropdown
                            options={specializationOptions}
                            placeholder="🔬 Select Specialization"
                            onChange={(selectedOption: any) => {
                              setSpecializationName(selectedOption);
                            }}
                            value={specializationName}
                          /> */}

                        {/* <button
                            onClick={handleFilter}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Search
                          </button> */}

                        {/* <button
                            onClick={handleFilter}
                            // className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center group transition-colors"
                            // className="flex items-center justify-center group bg-[#4CB847]-500 hover:bg-[#4CB847]-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                            className="flex items-center justify-center group bg-[#4CB847] hover:bg-[#3A9236] text-white font-medium py-2 px-4 rounded-md transition-colors"
                          >
                            Search
                            <ArrowRight
                              className="ml-2 w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 text-white transition-all duration-200"
                              size={20}
                            />
                          </button> */}

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                          <input
                            type="text"
                            placeholder="Search doctors"
                            value={docName}
                            onChange={handleDateChange}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />

                          {/* <FilterDropdown
                options={hospitalsOptions}
                placeholder="👩‍⚕️ Select Doctor"
                onChange={setDocName}
                value={docName}
              /> */}

                          {/* <FilterDropdown
                options={citiesOptions}
                placeholder="📍 Location"
                onChange={setLocation}
                value={location}
              /> */}
                          {/* <FilterDropdown
                options={genderOptions}
                placeholder="Gender"
                onChange={setGender}
                value={gender}
              /> */}
                          <FilterDropdown
                            options={specializationOptions}
                            placeholder="👩‍⚕️ Select Specialization"
                            onChange={setSelectedSpecialization}
                            value={nameSpecialization}
                          />
                          {/* 
          <FilterDropdown
            options={departmentOptions}
            placeholder="👩‍⚕️ Select Department"
            onChange={setSelectedDeparment}
            value={selectedDeparment}
          />

          <FilterDropdown
            options={petsOptions}
            placeholder="👩‍⚕️ Select Pet"
            onChange={setSelectedPet}
            value={selectedPet}
          /> */}

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
                              <PopoverContent
                                align="start"
                                className="p-0 z-50"
                              >
                                <Calendar
                                  mode="single"
                                  selected={selectedDate}
                                  onSelect={(date) => {
                                    setSelectedDate(date);
                                    setOpen(false);
                                  }}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>

                          <button
                            onClick={handleSearch}
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
                        {/* </div> */}
                      </section>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-200  rounded-lg shadow-lg p-8 flex-grow flex-shrink-0 w-full md:w-1/3">
                <div className="flex items-center">
                  <Image
                    src={booking}
                    alt="Your Image"
                    className="w-1/2 h-auto object-cover rounded-lg -mt-10"
                  />
                  <div className="flex-grow pl-4">
                    <h3 className="text-lg font-bold">
                      Are You Make an Appointment
                    </h3>
                    <button
                      className="bg-blue-600 text-white px-4 py-3 text-nowrap rounded-lg shadow hover:bg-blue-700 mt-4"
                      onClick={() => router.push('/Appointments')}
                    >
                      My Appointments
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div id="departments" className="pb-8 px-6  pt-12">
          <PopularDoctors
            title="Hospitals"
            description="Your Pets Nutritional Health is Very Important & Our Priority"
            // link="/hospitalHomepage"
            handleClick={handleClick}
            linkDescription={'See Departments'}
            doctors={filterAllHspitals?.slice(0, 4)}
            // pathname={'/hospitalHomepage'}
          />
        </div> */}
        <div>
          <section className="flex flex-col items-center py-12 z-5 w-full px-4 pb-8 max-w-6xl mx-auto">
            <div className="flex flex-row justify-between items-center w-full">
              <div className="m1 flex-1 text-center">
                <h1 className="text-4xl font-bold leading-snug">
                  Welcome to Stubby!
                  <span className="text-red-500">
                    Your one-stop solution for pet healthcare and more.
                  </span>
                </h1>
                <p className="mt-4 text-gray-600">
                  Here, you can explore and select hospitals nearby,
                  <br />
                  filter by your preferences, and choose expert doctors
                  <br />
                  to book appointments for your beloved pets.
                </p>
                <p className="border-blue-500 text-blue-500 py-2 px-4 rounded hover:text-black transition">
                  Sign in now to unlock appointment booking and personalized
                  features!
                </p>
                <div className="mt-6 space-x-4">
                  {/* Uncomment the button below if needed */}
                  {/* <button className="bg-white border border-blue-500 text-blue-500 py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition">
      Select Hospital
    </button> */}
                </div>
              </div>

              <div className="relative m2 flex-1 flex items-center justify-center">
                <Image
                  src={doc}
                  alt="Dr. Tyrone Grindle"
                  width={300}
                  height={400}
                  className="rounded-lg "
                />
                <div className="absolute bottom-0 bg-blue-900 text-white p-3 rounded-md shadow-lg ml-80 transform -translate-x-1/2 border-r-2 border-red-500">
                  <p className="text-sm">Greetings & Welcome to</p>
                  <p className="text-lg font-bold text-center">STUBBY</p>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* 
        <div id="doctors" className="pb-8 pt-20">
          <PopularDoctors
            title="Popular Doctors"
            description="Meet With Professional Doctors."
            link="/doctors"
            handleClick={handleClick}
            linkDescription="See Doctors"
            doctors={doctors?.slice(0, 4)}
            pathname={'/appointmentdoctor'}
            query={doctors}
            doctor={true}
          />
        </div>
        <div id="pets" className="pb-8 pt-20">
          <PopularDoctors
            title="Pets Nutritional"
            description="Your Pets Nutritional Health is Very Important & Our Priority"
            link="/pets"
            handleClick={handleClick}
            linkDescription={'See Pets'}
            doctors={pets?.slice(0, 4)}
            pathname={'/pets'}
            query={petdata}
          />
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 container mx-auto px-8 w-full py-8">
          <ServiceCard
            isMain
            title="Doctor Channelling"
            subtitle="Channel a doctor"
            icon={
              <div className="w-12 h-12 rounded-full bg-white/20 relative flex items-center justify-center">
                <div className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full" />
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            }
          />

          <ServiceCard
            title="ePremium"
            subtitle="Member Benefits"
            icon={
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-amber-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7.2-6.3-4.8-6.3 4.8 2.3-7.2-6-4.6h7.6z" />
                </svg>
              </div>
            }
          />

          <ServiceCard
            title="Driving License Medical"
            subtitle="Book an appointment"
            icon={
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M21 16V6a1 1 0 00-1-1h-8"
                  />
                </svg>
              </div>
            }
          />

          <ServiceCard
            title="IOM Visa Medical"
            subtitle="Pre-Migration Health Assessment"
            icon={
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
            }
          />
        </div>

        <div className="container mt-14 mx-auto px-8 w-full py-8">
          <AdvancedSearchFilter
            citiesOptions={citiesOptions}
            petsOptions={petsOptions}
            hospitalsOptions={hospitalsOptions}
            specializationOptions={specializationOptions}
            departmentOptions={departmentOptions}
            onSearch={handleSearch}
          />
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* <div className='flex items-center '>
    <h2 className="text-2xl font-semibold text-gray-800 mb-8">Top Specialists</h2>
    <HeartPulse/>
    </div> */}
          <div className="flex items-center space-x-2 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">
              Top Specialists
            </h2>
            <HeartPulse className="w-6 h-6 text-red-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors && doctors.length > 0 ? (
              doctors.map((doctor: any) => (
                <SpecialistCard
                  key={doctor.id}
                  specialist={doctor}
                  onClick={() =>
                    router.push(`/doctor-details/${doctor.id}`)
                  }
                />
              ))
            ) : (
              <p className="text-gray-500">No specialists available</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
