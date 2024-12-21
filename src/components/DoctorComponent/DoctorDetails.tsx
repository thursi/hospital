import React from 'react';
import Link from 'next/link'; // Import Link from next/link
import { ArrowRight } from 'lucide-react';

interface DoctorDetailsProps {
  doctor: any;
}

const DoctorDetails: React.FC<DoctorDetailsProps> = ({ doctor }) => {
  const defaultImage = '/department.png';
  if (!doctor) {
    return <div>Doctor not found.</div>;
  }
const pathname='/appointmentdoctor'
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg">
          <img
            src={doctor.preSignedUrl || defaultImage}
            alt={'name'}
            className="w-24 h-24 rounded-full mb-4"
          />
          <h2 className="text-xl font-bold text-center">{doctor.name}</h2>
          <p className="text-sm text-gray-600 text-center">
            {doctor.specializationName || 'Specialization N/A'}
          </p>
          <h3 className="text-sm text-gray-600 text-center">Department of { doctor.departmentResponse.name}</h3>

          <p className="text-sm text-gray-600 text-center">
            {doctor.description}
          </p>
          {/* Wrap the button with Link to navigate to the doctor details page */}
          <Link
            href={{
              pathname: `${pathname}${doctor.id && !doctor ? `/${doctor.id}` : ''}`,
              query: doctor ? { doctorId: doctor.id } : undefined,
            }}
            // href={{
            //   pathname: `/appointmentdoctor/${doctor.id}`, 
            //   query: { doctorId: doctor.id }, // Add query parameters if needed
            // }}
            passHref
          >
            <button             className="flex items-center justify-center group bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Booking Now
              <ArrowRight
              className="ml-2 w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 text-white transition-all duration-200"
              size={20}
            />
            </button>
          </Link>
        </div>

        <div className="flex-grow">
        

          {doctor.petResponses && doctor.petResponses.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-4">Pets</h3>
              <div className="flex flex-col gap-4">
                {doctor.petResponses.map((pet: any, index: number) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-4 rounded-lg shadow-sm flex items-center gap-4"
                  >
                    <img
                      src={pet.preSignedUrl || '/placeholder.png'}
                      alt={pet.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h4 className="text-lg font-bold">{pet.name}</h4>
                      <h4 className="text-sm text-gray-600 text-center">{pet.description}</h4>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hospitals and Services section */}
      {doctor.hospitalDetails && doctor.hospitalDetails.length > 0 && (
        <div>
          <h3 className="text-lg font-bold mb-4">Hospitals & Services</h3>
          <div className="flex flex-col gap-4">
            {doctor.hospitalDetails.map((hospital: any, index: number) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-between items-start"
              >
                <div>
                  <h4 className="text-lg font-bold">{hospital.hospitalName}</h4>
                  <ul className="list-disc list-inside text-gray-700">
                    {hospital.services.map((service: string, idx: number) => (
                      <li key={idx} className="text-sm">
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                  Channel
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDetails;
