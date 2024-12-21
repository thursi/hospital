'use client';

import Header from '@/components/HomeComponent/Header';
import CircledArrowIcon from '@/components/svg/circled-arrow-icon';
import { useCallback, useEffect, useState } from 'react';
import {
  getAppointmentBooking,
  getAppointmentBookingFilterData,
  getHospitalFilterData,
} from '../../../home/action';
import { useAuthStore } from '@/store/authStore';
import { useDoctorStore } from '@/store/doctorStore';
import AppointmentCard from '@/components/ui/appointmentcard';

const Appointments = (premiumBookings: any, normalBookings: any) => {
  const [login] = useAuthStore((state) => [state.login]);
  const [doctorAppointments, setDoctorAppointments, doctorfiltAppointments] =
    useDoctorStore((state: any) => [
      state.doctorAppointments,
      state.setDoctorAppointments,
      state.doctorfiltAppointments,
    ]);
  const [activeTab, setActiveTab] = useState('all');

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  const getAppointmentDetails = useCallback(async () => {
    try {
      const filterAppointmentList = await getAppointmentBookingFilterData({
        pageSize: 10,
        pageCount: 1,
        userId: login?.userId,
      });

      setDoctorAppointments(filterAppointmentList?.records);
    } catch (error) {
      console.error('Error fetching hospital data:', error);
    }
  }, [login?.userId, setDoctorAppointments]);

  useEffect(() => {
    getAppointmentDetails();
  }, [getAppointmentDetails]);
  const renderTabContent = () => {
    switch (activeTab) {
      case 'premium':
        return (
          <AppointmentCard
            AppointmentList={doctorfiltAppointments}
            handleClick={handleDoctorClick}
          />
        );
      case 'normal':
        return <div>Normal Bookings: {normalBookings.length}</div>;
      case 'all':
        return (
          <div>
            All Bookings: {premiumBookings.length + normalBookings.length}
          </div>
        );
      default:
        return null;
    }
  };

  const doctors = [
    {
      id: '1',
      name: 'Dr. Shahid Ali',
      specialization: 'Radiologist',
      imageUrl: '/images/doctor1.jpg',
      email: 'shahid@example.com',
      phone: '1234567890',
      patients: [
        {
          id: '1',
          name: 'Vetrovs, Madelyn',
          appointmentDate: '02 June 2023 9:00AM',
          imageUrl: '/images/patient1.jpg',
        },
      ],
    },
    {
      id: '2',
      name: 'Dr. Zohra Chowdhury',
      specialization: 'Radiologist',
      imageUrl: '/images/doctor2.jpg',
      email: 'zohra@example.com',
      phone: '1234567890',
      patients: [
        {
          id: '2',
          name: 'Hausmann, Veronique',
          appointmentDate: '02 June 2023 9:00AM',
          imageUrl: '/images/patient2.jpg',
        },
      ],
    },
  ];

  const handleDoctorClick = (doctorId: string) => {
    console.log('Book doctor with ID:', doctorId);
  };

  return (
    <div className="container mx-auto mt-16 bg-[#F7F8F9] rounded-xl">
      <div className="sticky z-30 top-0 md:static h-fit">
        {/* <Header /> */}
      </div>

      <div className="flex border-b">
        <button
          className={`px-4 py-2 ${
            activeTab === 'premium' ? 'border-b-2 border-blue-500' : ''
          }`}
          onClick={() => handleTabClick('premium')}
        >
          Doctor
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === 'normal' ? 'border-b-2 border-blue-500' : ''
          }`}
          onClick={() => handleTabClick('normal')}
        >
          Medicine
        </button>
      </div>
      <div className="mt-4">{renderTabContent()}</div>
    </div>
  );
};

export default Appointments;
