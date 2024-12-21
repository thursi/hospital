// import Image from "next/image";
// import Link from "next/link";

// interface DoctorCardProps {
//   id?: string;
//   preSignedUrl: string;
//   name: string;
//   departmentName: string;
//   specializationName?: string;
//   petResponses?: { name: string }[];
//   hospitalName?: string;
//   handleClick: (imageName: any, image: any, id: any) => void;
//   pathname?: string;
// }

// const DoctorCard: React.FC<DoctorCardProps> = ({
//   id,
//   preSignedUrl,
//   name,
//   departmentName,
//   specializationName,
//   petResponses,
//   hospitalName,
//   handleClick,
//   pathname,
// }) => {
//   const defaultImage = "/department.png";

//   return (
//     <Link
//       href={{
//         pathname: `${pathname}${id ? `/${id}` : ""}`,
//       }}
//       onClick={() => handleClick(name, preSignedUrl, id)}
//       className="cursor-pointer relative overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 shadow-lg rounded-lg"
//     >
//       <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>

//       <Image
//         src={preSignedUrl || defaultImage}
//         width={1000}
//         height={1000}
//         alt={name}
//         className="w-full h-60 object-cover object-top md:w-100 md:h-80 rounded-t-lg"
//       />

//       <div className="absolute bottom-0 left-0 w-full bg-gray-800 bg-opacity-80 text-white p-4">
//         <div className="flex flex-col">
//           <div className="font-bold text-lg truncate">{name}</div>

//           {specializationName && (
//             <div className="text-sm text-gray-300 truncate">
//               Specialization: {specializationName}
//             </div>
//           )}

//           {departmentName && (
//             <div className="text-sm text-gray-300 truncate">
//               Department: {departmentName}
//             </div>
//           )}

//           {petResponses && petResponses.length > 0 && (
//             <div className="text-sm text-gray-300 truncate">
//               Pet: {petResponses[0].name}
//             </div>
//           )}

//           {hospitalName && (
//             <div className="text-sm text-gray-300 truncate">
//               Hospital: {hospitalName}
//             </div>
//           )}
//         </div>
//       </div>
//     </Link>
//   );
// };

// interface MultipleImagesDoctorProps {
//   title: string;
//   description: string;
//   handleClick: (imageName: any, image: any, id: any) => void;
//   pathname?: string;
//   doctors: DoctorCardProps[];
//   query?: [] | any;
// }

// const MultipleImagesDoctorProps: React.FC<MultipleImagesDoctorProps> = ({
//   title,
//   description,
//   doctors,
//   handleClick,
//   pathname,
// }) => {
//   return (
//     <div className="w-full container pt-20 pb-20 px-0 md:px-7 mx-auto">
//       <div className="border-l-2 border-red-500 pl-2">
//         <h2 className="font-bold text-2xl">{title}</h2>
//       </div>
//       <div className="flex flex-row justify-between items-center">
//         <p className="text-l border-l-2 border-white-500 pl-2">{description}</p>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-5">
//         {doctors.map((doctor, index) => (
//           <DoctorCard
//             key={index}
//             id={doctor.id}
//             preSignedUrl={doctor.preSignedUrl}
//             name={doctor.name}
//             departmentName={doctor.departmentName}
//             specializationName={doctor.specializationName}
//             petResponses={doctor.petResponses}
//             hospitalName={"hospitalName"}
//             handleClick={handleClick}
//             pathname={pathname}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MultipleImagesDoctorProps;

'use-client';
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface DoctorCardProps {
  id?: string;
  preSignedUrl: string;
  gender: string;
  name: string;
  departmentName: string;
  specializationName?: string;
  petResponses?: { name: string }[];
  hospitalName?: string;
  // handleClick: (imageName: any, image: any, id: any) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  id,
  preSignedUrl,
  gender,
  name,
  departmentName,
  specializationName,
  petResponses,
  hospitalName,
  // handleClick,
}) => {
  const defaultImage = "/department.png"; 
  const router = useRouter(); 
  
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent click from bubbling up
    console.log("thusi.................")
    // handleClick(name, preSignedUrl, id); // Call the custom click handler
    // if (id) {
      router.push(`/doctor-details/${id}`); // Navigate to the doctor page
    // }
  };

  return (
    <Link
      href={`/doctor-details/${id}`} // Navigate to /doctor/:id dynamically
      onClick={(e) => {
        e.stopPropagation(); // Prevent click from bubbling up
        // handleClick(name, preSignedUrl, id); // Handle click event for doctor info
      }}
      className="cursor-pointer relative overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 shadow-lg rounded-lg p-4"
    >
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
          <Image
            src={preSignedUrl || defaultImage}
            alt={name}
            width={80}
            height={80}
            className="object-cover"
            loading="lazy" 
          />
        </div>
      </div>

      {/* Gender */}
      <div className="text-center text-gray-500 text-sm mt-2">{gender}</div>

      {/* Name */}
      <div className="text-center text-lg font-bold mt-2">{name}</div>

      {/* Specialization */}
      {specializationName && (
        <div className="text-center text-sm text-gray-600">{specializationName}</div>
      )}

      {/* Department */}
      {departmentName && (
        <div className="text-center text-sm text-gray-600">
          Department: {departmentName}
        </div>
      )}

      {/* Pet Responses */}
      {petResponses && petResponses.length > 0 && (
        <div className="text-center text-sm text-gray-600">Pet: {petResponses[0].name}</div>
      )}

      {/* Hospital Name */}
      {hospitalName && (
        <div className="text-center text-sm text-gray-600">Hospital: {hospitalName}</div>
      )}

      {/* Book Now Button */}
      <div className="flex justify-center mt-4">
        <button className="flex items-center justify-center group bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              onClick={handleButtonClick}
        >
          See Now
          <ArrowRight
            className="ml-2 w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 text-white transition-all duration-200"
            size={20}
          />
        </button>
      </div>
    </Link>
  );
};




interface MultipleImagesDoctorProps {
  title: string;
  description: string;
  handleClick?: (imageName: any, image: any, id: any) => void;
  doctors: any[];
}

const MultipleImagesDoctorProps: React.FC<MultipleImagesDoctorProps> = ({
  title,
  description,
  doctors,
  handleClick,
}) => {

  
  return (
    <div className="w-full container pt-20 pb-20 px-0 md:px-7 mx-auto">
      <div className="border-l-2 border-red-500 pl-2">
        <h2 className="font-bold text-2xl">{title}</h2>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p className="text-l border-l-2 border-white-500 pl-2">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-5">
       
        {doctors?.map((doctor, index) => (
          <DoctorCard
            key={index}
            id={doctor.id}
            preSignedUrl={doctor.preSignedUrl}
            name={doctor.name}
            gender={doctor.gender}
            departmentName={doctor.departmentName}
            specializationName={doctor.specializationName}
            petResponses={doctor.petResponses}
            hospitalName={doctor.hospitalName}
            // handleClick={handleClick}
          />
        ))}
      </div>


      {/* {doctors && doctors.length > 0 ? (
  doctors.map((doctor, index) => (
    <DoctorCard
      key={index}
      id={doctor.id}
      preSignedUrl={doctor.preSignedUrl}
      name={doctor.name}
      gender={doctor.gender}
      departmentName={doctor.departmentName}
      specializationName={doctor.specializationName}
      petResponses={doctor.petResponses}
      hospitalName={doctor.hospitalName}
      handleClick={handleClick}
    />
  ))
) : (
  
  <p>No doctors found</p>
)} */}

    </div>
  );
};

export default MultipleImagesDoctorProps;