'use client';
import AppointmentBook from '@/components/AppointmentBook';
import Header from '@/components/HomeComponent/Header';
import Image from 'next/image';
import { useState } from 'react';
import DefaultDoc from '../../../../../public/default_user.png';
import { useDoctorStore } from '@/store/doctorStore';
import Loader from '@/components/Loader';
import { Mail, Smartphone } from 'lucide-react';
import DoctorCard from '@/components/ui/doctorcard';
import { useAuthStore } from '@/store/authStore';

const AppointmentDoctor = () => {
  const [login] = useAuthStore((state) => [state.login]);
  const [selectedDoctor, loading] = useDoctorStore((state: any) => [
    state.selectedDoctor,
    state.loading,
  ]);

  const [appointmentInfo, setAppointmentInfo] = useState({
    message: '',
    startDate: '',
    serialNumber: '',
    selectedDoctor: '',
    selectedValue: '',
  });
  const doctorOptions = [
    { label: 'Select doctor', value: '' },
    { label: 'Doctor 1', value: 'doctor1' },
    { label: 'Doctor 2', value: 'doctor2' },
    { label: 'Doctor 3', value: 'doctor3' },
  ];

  const handleChange = (field: any, value: any) => {
    setAppointmentInfo((prevState) => ({ ...prevState, [field]: value }));
  };

  return (
<div className="w-full flex justify-center container mt-10 overflow-x-hidden">
  <div className="flex flex-col md:flex-row w-full md:max-w-[950px] gap-4 p-6 bg-white border rounded shadow-md">
   

    <DoctorCard loading={loading} selectedDoctor={selectedDoctor} />

 
    <div className="flex-1 flex  flex-col"> 
      <AppointmentBook
        userId="1"
        message={appointmentInfo?.message}
        startDate={appointmentInfo?.startDate}
        serialNumber={appointmentInfo?.serialNumber}
        selectedDoctor={appointmentInfo?.selectedDoctor}
        handleDateChange={(newDate) => handleChange('startDate', newDate)}
        handleSerialNumberChange={(newSerialNumber) => handleChange('serialNumber', newSerialNumber)}
        handleDoctorChange={(value) => handleChange('selectedDoctor', value)}
        handleMessageChange={(newMessage) => handleChange('message', newMessage)}
        options={doctorOptions}
        selectedValue={appointmentInfo.selectedValue}
        onChange={(value) => handleChange('selectedValue', value)}
        doctors={doctorOptions}
        handleCalendarChange={(value: string) => {
          // Implement calendar change handling logic if needed
        }}
        login={login}
        medicines={[]}
        handleMedicineChange={(value: string) => {
          throw new Error('Function not implemented.');
        }}
      />
    </div>
  </div>
</div>

  
  );
};

export default AppointmentDoctor;
