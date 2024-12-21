import { Appointment } from '@/lib/typings';
import Image from 'next/image';
import Link from 'next/link';

interface Patient {
  id: string;
  name: string;
  appointmentDate: string;
  imageUrl: string;
}

interface Doctor {
  id: string;
  bookingDate: string;
  time: string;
  petName: string;
  petAge: string;
  petType: string;
  doctorResponse?: {
    id: string;
    name: string;
    email: string;
    phoneNo: string;
    dateOfBirth: string;
    gender: string;
    specialization: string;
  };
  medicineResponse?: {
    id: string;
    name: string;
  };
  description: string;
  status: string;
  bookingType: string;
  userResponse: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNo: string;
    dateOfBirth: string;
    gender: string;
  };
}

interface AppointmentCardProps {
  AppointmentList: Doctor[];
  handleClick: (doctorId: string) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  AppointmentList,
  handleClick,
}) => {
  const defaultImage = '/department.png';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      {AppointmentList.length > 0 ? (
        AppointmentList.map((doctor) => (
          <div
            key={doctor.id} // Use unique key
            className="m-2 hover:bg-white shadow-lg bg-slate-100 relative"
            style={{
              border: '1px solid #ddd',
              padding: '20px',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            <div className="flex items-center">
              <div className="flex-none mt-4 relative">
                <h1 className="text-x font-bold leading-snug">
                  {doctor?.petName}
                </h1>
                <p className="mt-1 text-sm text-gray-500">{doctor?.petType}</p>

                <Image
                  src={defaultImage}
                  alt="pet"
                  width={112}
                  height={200}
                  className="rounded-md object-cover"
                />
              </div>
              <div className="flex-grow pl-4">
                <p className="mt-1 text-sm text-gray-500">
                  {doctor.petAge} Yrs
                </p>
                <p className="text-gray-500">{doctor?.bookingDate}</p>
                <small className="text-gray-500">{doctor?.time}</small>
                <div className="flex mt-5">
                <p className="bg-white border text-s h-30 border-blue-500 text-blue-500 py-1 px-2 rounded hover:bg-blue-500 hover:text-white transition">{doctor?.status}</p>

                  {/* <Link
                    href={`mailto:${doctor.userResponse.email}`}
                    className="mr-4"
                  >
                    <i className="bi bi-envelope text-blue-600"></i> Email
                  </Link>
                  <Link href={`tel:${doctor.userResponse.phoneNo}`}>
                    <i className="bi bi-telephone text-blue-600"></i> Call
                  </Link> */}
                </div>
              </div>
            </div>

            <div className="mt-3">
              <h6 className="font-semibold">Doctor Details</h6>
              <div className="flex items-center mt-2">
                <Image
                  src={defaultImage}
                  alt={doctor.petName} 
                  width={50}
                  height={30}
                  className="rounded-full object-cover"
                />
                <div className="ml-2">
                  <p className="text-gray-500">
                    {doctor?.doctorResponse?.name}
                  </p>
                  <small className="text-gray-500">
                    {doctor?.doctorResponse?.specialization}
                  </small>
                </div>
              </div>

              <div className='mt-8'>
                <button
                  onClick={() => handleClick(doctor.id)}
                  className="absolute bottom-2 right-3 bg-red-500 h-15 w-30 mt-10 text-white px-4 py-2 rounded-md hover:bg-red-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="m-10 text-center justify-center text-xl align-middle text-gray-600">
          No appointments available
        </p>
      )}
    </div>
  );
};

export default AppointmentCard;
