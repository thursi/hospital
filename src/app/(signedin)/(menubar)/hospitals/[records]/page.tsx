
'use client';
import React, { useEffect, useState } from 'react';
import { useHospitalStore } from '@/store/hospitalStore';
import FilterDropdown from '@/components/FilterDropdown';
import { getHospitalFilterData } from '@/app/home/action';
import { Search } from 'lucide-react';
import SearchHeader from '@/components/HomeComponent/SearchHeader';
import { useRouter } from 'next/navigation';
import HospitalImageCard from '@/components/HospitalImageCard';

const Index = ({ params }: { params: { records: string } }) => {
  const decodedRecords = JSON.parse(decodeURIComponent(params?.records));
  const [hospitalName, setHospitalName] = useState<any>('');
  const [hospitalResName, setResHospitalName] = useState<any>(undefined);
  const router = useRouter();

  const [selectedDoctor, setSelectedDoctor] = useState<any>('');
  const [hospitals, setAllHospitals] = useHospitalStore((state: any) => [
    state.hospitals,
    state.setAllHospitals,
  ]);
  console.log('hospitalNamehospitalName', hospitalName);
  useEffect(() => {
    getHospitalDetails();
    getResHospitalDetails();
  }, [decodedRecords]);
  console.log('object', decodedRecords);
  const getHospitalDetails = async () => {
    try {
      const searchTextData = await getHospitalFilterData({
        pageSize: 10,
        pageCount: 1,
        searchTerm: undefined,
        cityId: decodedRecords?.cityId,
        hospitalId: hospitalName
          ? hospitalName?.value
          : decodedRecords?.hospitalId,
        specializationId: decodedRecords?.specializationId,
        day: decodedRecords.day,
      });

      const activeHospitals = searchTextData?.records?.filter(
        (hospital: any) => hospital.active
      );
      setAllHospitals(activeHospitals);
    } catch (error) {
      console.error('Error fetching hospital data:', error);
    }
  };

  const getResHospitalDetails = async () => {
    try {
      const searchTextData = await getHospitalFilterData({
        pageSize: 10,
        pageCount: 1,
        searchTerm: undefined,
        cityId: decodedRecords?.cityId,
        hospitalId: decodedRecords?.hospitalId,
        specializationId: decodedRecords?.specializationId,
        day: decodedRecords.day,
      });

      // setResHospitalName(searchTextData?.records);

      const activeHospitals = searchTextData?.records?.filter(
        (hospital: any) => hospital.active
      );
      setResHospitalName(activeHospitals);
    } catch (error) {
      console.error('Error fetching hospital data:', error);
    }
  };

  const handleClick = (name: string, url: string, id: string) => {};

  const handleDoctorSelect = (doctor: any) => {
    setSelectedDoctor(doctor);
  };
  return (
    <div className="w-full mx-auto px-4 py-8">
    <div className='py-4'>
      <SearchHeader
        searchText="4d Anomaly Scan -12 Weeks Nt"
        onBack={() => {
          router.push(`/`);
        }}
        onClose={() => {
          router.push(`/`);
        }}
      />
</div>
      <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
        <h3 className="text-sm font-bold mb-4">Hospital properties found</h3>
        <hr className="my-4 border-t-2 border-gray-300" />

        <div className="flex justify-end items-center gap-6">
          <FilterDropdown
            options={hospitalResName?.map((h: any) => ({
              label: h.name,
              value: h.id,
            }))}
            placeholder="🏥 Select Hospital"
            onChange={setHospitalName}
            value={hospitalName}
          />
          {/* <button
            onClick={()=>getHospitalDetails}
            className="bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button> */}

          <button
            onClick={getHospitalDetails}
            className="bg-blue-600 text-white px-8 py-2.5 w-64 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      {hospitals?.filter((hospital: any) => hospital.active).length > 0 ? (
        hospitals
          ?.filter((hospital: any) => hospital.active)
          .map((hospital: any) => (
            <HospitalImageCard
              key={hospital.id}
              item={hospital}
              onClick={(id: any) => console.log('Hospital clicked:', id)}
              pathname="/hospital"
              setSelectedDoctor={handleDoctorSelect}
              handleClick={handleClick}
            />
          ))
      ) : (
        // <div className="text-center text-gray-500 text-lg">
        //   No hospital found.
        // </div>
        <div className="w-full">
          <div className="text-sm text-blue-600 text-right mb-2">
            0 Results Found
          </div>
          <div className="border rounded-lg p-8">
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-white" />
              </div>
              <div className="text-gray-400 text-xl font-medium">
                No data found
              </div>
              <div className="text-gray-400 text-sm max-w-lg text-center">
                No search results found for
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
