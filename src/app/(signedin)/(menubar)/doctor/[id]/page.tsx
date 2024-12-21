'use client';
import { getDoctorById } from '@/app/(signedin)/doctor-details/[id]/action';
import DoctorDetails from '@/components/DoctorComponent/DoctorDetails';
// import DoctorDetails from '@/components/DoctorComponent/DoctorDetails';
import { useDoctorStore } from '@/store/doctorStore';
import { useEffect } from 'react';

const Index = ({ params }: { params: { id: string } }) => {
  const [
    selectedDoctor,
    setSelectedDoctor,
    loading,
    setdLoading,
    doctorAppointments,
    setDoctorAppointments,
  ] = useDoctorStore((state: any) => [
    state.selectedDoctor,
    state.setSelectedDoctor,
    state.loading,
    state.setdLoading,
    state.doctorAppointments,
    state.setDoctorAppointments,
  ]);

  async function fetchData() {
    const response = await getDoctorById(params.id);
    setSelectedDoctor(response);
    setdLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [params.id]);

  return (
    <div className="container mt-16 mx-auto my-8">
      {loading ? (
        <div>Loading...</div>
      ) : selectedDoctor ? (
        <DoctorDetails doctor={selectedDoctor} />
      ) : (
        <div>Doctor not found.</div>
      )}
    </div>
  );
};

export default Index;
