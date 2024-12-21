import { doctorResponses } from '@/lib/typings';
import { useDoctorStore } from '@/store/doctorStore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Doctor {
  id?: any;
  preSignedUrl?: string;
  name: string;
  gender?: string;
  qualification?: string;
  specializationName?: string;
  duration?: string;
  description?: string;
}

interface DocBookProps {
  doctors: doctorResponses[];
  defaultImage: string;
  pathname: string;  
  doctor?: boolean;  
  handleClick: (name: string, preSignedUrl: string|null, id: string) => void;
  // setSelectedDoctor: (doctor: Doctor) => void;
}

const DocBook: React.FC<DocBookProps> = ({
  doctors,
  defaultImage,
  pathname,
  doctor,
  handleClick,
  // setSelectedDoctor,


}) => {
  const [setSelectedDoctor] = useDoctorStore((state: any) => [
    state.setSelectedDoctor,
  ]);

  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      {doctors.length > 0 ? (
        doctors.map((image, index) => (
          <div
            key={index}
            className="m-2 hover:bg-white shadow-lg bg-slate-100 relative"
            style={{
              border: '1px solid #ddd',
              padding: '20px',
              borderRadius: '8px',
              cursor: 'pointer',
              paddingBottom: '60px', 
            }}
          >
            <div className="flex">
              <div className="flex-grow pl-4">
                <h1 className="text-xl font-bold leading-snug">{image?.name}</h1>
                {image?.gender && (
                  <p className="mt-1 text-sm text-gray-500">Gender: {image?.gender}</p>
                )}
                {image?.qualification && (
                  <p className="mt-1 text-sm text-gray-500">Qualification: {image?.qualification}</p>
                )}
                {image?.specializationName && (
                  <p className="mt-1 text-sm text-gray-500">
                    Specialization: {image?.specializationName}
                  </p>
                )}
                {image?.duration && (
                  <p className="mt-1 text-sm text-gray-500">Duration: {image?.duration} mins</p>
                )}
              </div>
              <div className="flex-none mt-4 relative">
                <Image
                  src={image?.preSignedUrl || defaultImage}
                  alt={image?.name || 'Doctor'}
                  width={112}
                  height={112}
                  className="rounded-md object-cover"
                />
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500">Description: {image?.description}</p>

            {/* Link with dynamic routing logic */}
            <Link
              href={{
                pathname: `${pathname}${image.id && !doctor ? `/${image.id}` : ''}`,
                query: doctor
                  ? {
                      doctorId: image.id,
                    }
                  : undefined,
              }}
              onClick={() => {
                if (doctor) setSelectedDoctor(image);
                handleClick(image.name, image.preSignedUrl, image.id);
              }}
              className="absolute bottom-2 right-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Book Now
            </Link>
          </div>
        ))
      ) : (
        <p className="m-10 text-center justify-center text-xl align-middle text-gray-600">
          No doctors available
        </p>
      )}
    </div>
  );
};

export default DocBook;
