// // import React from 'react';

// // interface Specialist {
// //   name: string;
// //   specializationName: string;
// //   preSignedUrl: string;
// // }

// // interface SpecialistCardProps {
// //   specialist: Specialist;
// //   onClick?: () => void;
// // }

// // const SpecialistCard = ({ specialist, onClick }: SpecialistCardProps) => {
// //     console.log("specialist",specialist);
// //   const defaultImage = '/department.png';

// //   return (
// //     <div
// //       className="p-6 bg-blue-50 rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer"
// //       onClick={onClick}
// //     >
// //       <div className="flex flex-col items-center text-center space-y-4">
// //         <div className="w-16 h-16 relative">
// //           <img
// //             src={specialist.preSignedUrl?specialist.preSignedUrl:defaultImage}
// //             alt={specialist.name}
// //             className="w-full h-full object-cover rounded-full"
// //           />
// //         </div>
// //         <h3 className="text-lg font-medium text-gray-700">{specialist.name}</h3>
// //         <p className="text-sm text-gray-600 max-w-xs">{specialist.specializationName}</p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SpecialistCard;

import { Stethoscope } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface Specialist {
  id:any,
  name: string;
  specializationName: string;
  preSignedUrl: string;
}

interface SpecialistCardProps {
  specialist: Specialist;
  onClick?: () => void;
}

const SpecialistCard = ({ specialist, onClick }: SpecialistCardProps) => {
  const defaultImage = '/department.png';

  return (
    <Link
    href={`/doctor-details/${specialist.id}`}
    onClick={(e) => {
      e.stopPropagation(); 
 
    }}
    // className="cursor-pointer relative overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 shadow-lg rounded-lg p-4"
  >
    <div
      className="p-6 bg-blue-50 rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center space-y-4 relative">
        <div className="w-16 h-16 relative">
          <img
            src={
              specialist?.preSignedUrl ? specialist?.preSignedUrl : defaultImage
            }
            alt={specialist?.name}
            className="w-full h-full object-cover rounded-full"
          />

          <div className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
            <Stethoscope className="w-4 h-4 text-blue-500" />
          </div>
        </div>
        <h3 className="text-lg font-medium text-gray-700">
          {specialist?.name}
        </h3>
        <p className="text-sm text-gray-600 max-w-xs">
          {specialist?.specializationName}
        </p>
      </div>
    </div>
</Link>
  );
};

export default SpecialistCard;



// import { Stethoscope } from 'lucide-react';
// import Link from 'next/link';
// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';

// interface Specialist {
//   id: any;
//   name: string;
//   specializationName: string;
//   preSignedUrl: string;
// }

// interface SpecialistCardProps {
//   specialist: Specialist;
//   onClick?: () => void;
// }

// const SpecialistCard = ({ specialist, onClick }: SpecialistCardProps) => {
//   const [imageSrc, setImageSrc] = useState('/department.png');
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     if (specialist?.preSignedUrl) {
//       const img = new window.Image();
//       img.src = specialist.preSignedUrl;
//       img.onload = () => {
//         setImageSrc(specialist.preSignedUrl);
//         setIsLoaded(true);
//       };
//       img.onerror = () => {
//         setImageSrc('/department.png');
//         setIsLoaded(false);
//       };
//     }
//   }, [specialist?.preSignedUrl]);

//   return (
//     <Link
//       href={`/doctor/${specialist.id}`}
//       onClick={(e) => {
//         e.stopPropagation();
//         onClick?.();
//       }}
//       className="block"
//     >
//       <div
//         className={`p-6 bg-blue-50 rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer ${
//           isLoaded ? 'opacity-100' : 'opacity-70'
//         }`}
//       >
//         <div className="flex flex-col items-center text-center space-y-4 relative">
//           <div className="w-16 h-16 relative">
//             <Image
//               src={imageSrc}
//               alt={specialist?.name || 'Specialist'}
//               fill
//               className="object-cover rounded-full"
//               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//               priority={false}
//               loading="lazy"
//             />

//             <div className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
//               <Stethoscope className="w-4 h-4 text-blue-500" />
//             </div>
//           </div>
          
//           {/* Lazy text loading with placeholder */}
//           <h3 className={`text-lg font-medium text-gray-700 ${
//             specialist?.name ? 'opacity-100' : 'opacity-50 animate-pulse'
//           }`}>
//             {specialist?.name || 'Loading...'}
//           </h3>
          
//           <p className={`text-sm text-gray-600 max-w-xs ${
//             specialist?.specializationName ? 'opacity-100' : 'opacity-50 animate-pulse'
//           }`}>
//             {specialist?.specializationName || 'Specialization loading...'}
//           </p>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default SpecialistCard;