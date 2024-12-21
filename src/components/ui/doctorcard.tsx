import React from 'react';
import Image from 'next/image'; // Adjust the import according to your setup
import DefaultDoc from '../../../public/default_user.png';
import { Mail, Smartphone } from 'lucide-react';
import Loader from '../Loader';
import { useDoctorStore } from '@/store/doctorStore';

interface DoctorCardProps {
  loading: boolean;
  selectedDoctor: {
    preSignedUrl?: string;
    name: string;
    departmentName: string;
    specializationName: string;
    email: string;
    phoneNo: string;
    description: string;
  } | null;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ loading, selectedDoctor }) => {
  const defaultImage = '/department.png';

  return (
    <div className="flex w-full h-full  pb-1 md:w-[350px] md:h-full md:basis-1/2 md:justify-self-start md:justify-end self-start">
      {loading ? (
        <div className="flex flex-col grow items-center justify-center p-10 md:max-w-[470px] bg-white border rounded">
          <Loader className="h-10 w-10" />
        </div>
      ) : (
        <div className="flex w-full grow md:justify-self-end items-center md:h-full flex-col gap-5 p-6 md:max-w-[470px] border rounded  bg-white h-full ">
          {/* <div className="relative flex h-[350px] w-[150px] md:w-full md:h-[420px] self-center -p-8 rounded-xl md:bg-[#666666]"> */}

          {/* {selectedDoctor?.preSignedUrl ? ( */}
          <div className="relative h-[350px] w-full rounded-full">
            <Image
              src={selectedDoctor?.preSignedUrl || DefaultDoc}
              alt="doctor"
              fill
              className="object-cover object-top rounded-full md:rounded-none"
            />
          </div>
          <div className="flex flex-col items-center gap-2 px-2 text-center">
            {/* <p className="text-gray-600 font-bold text-x md:text-xl w-full">
                <br />
                Department in
                <br />
                {selectedDoctor?.departmentName}
              </p> */}
          </div>
          <div className="font-bold text-s md:text-x w-full  text-xl md:text-2xl">
            <p className="text-black flex items-center">
              {selectedDoctor?.name}
            </p>
          </div>

          <div className="font-bold text-s md:text-x w-full">
            <p className="text-gray-600 flex items-center">
              Specialization in {''}
              {selectedDoctor?.specializationName}
            </p>
          </div>

          <div className="font-bold text-s md:text-x w-full">
            <p className="text-gray-600 flex items-center">
              <Mail className="mr-2" />
              {selectedDoctor?.email}
            </p>
          </div>
          <div className="font-bold text-s md:text-x w-full">
            <p className="text-gray-600 flex items-center">
              <Smartphone className="mr-2" />
              {selectedDoctor?.phoneNo}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorCard;
