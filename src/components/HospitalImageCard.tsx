import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HospitalImageCardProps {
  item: any;
  onClick: (id: string) => void;
  pathname?: string;
  doctor?: boolean;
  setSelectedDoctor?: (doctor: any) => void;
  handleClick?: (name: string, url: string, id: string) => void;
  defaultImage?: string;
}

const HospitalImageCard = ({
  item,
  onClick,
  pathname = '/hospital',
  doctor = false,
  setSelectedDoctor,
  handleClick,
  defaultImage = '/api/placeholder/400/320',
}: HospitalImageCardProps) => {
  const doctors =
    item.doctorDepartmentResponses
      ?.flatMap((dept: any) =>
        dept.doctorResponses?.map((doc: any) => ({
          ...doc,
          departmentName: dept.departmentResponse.name,
        }))
      )
      .filter(Boolean) || [];

  return (
    <div className="bg-white rounded-lg p-6  flex gap-6 m-8 flex-wrap items-start relative">


      <div className="flex-shrink-0">
        <Image
          src={item.preSignedUrl || defaultImage}
          alt={item.name}
          width={144}
          height={144}
          className="object-cover rounded-lg"
        />
      </div>

      <div className="flex-grow">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
          <p className="text-gray-500">From {item.city}</p>
          <p className="text-sm text-gray-600 mt-1">at {item.address}</p>
        </div>
      </div>


      <div className="flex flex-col justify-start items-start">
        <div
          className={`px-2 py-1 rounded text-sm font-semibold ${
            item.active
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {item.active ? "Active" : "Inactive"}
        </div>
        <span className="text-sm text-gray-600 mt-1">
          {item.openTime} - {item.closeTime}
        </span>
      </div>

 
      <div className="flex flex-col">
      {item.doctorDepartmentResponses?.map((dept: any) => (
            <span
              key={dept.departmentResponse.id}
              className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 inline-block mb-1 mr-1"
            >
              Department of {dept.departmentResponse.name}
            </span>
          ))}
       
      </div>




      {/* <div className="flex flex-col justify-start items-start">
        <div
          className={`px-1 py-1 rounded text-sm font-semibold`}
        >
        <span className="text-red-600 font-medium">
            {doctors.length} doctors available
          </span>
        </div>
        <span className="text-sm px-1 text-gray-600 mt-1">
        Book your appointment today
        </span>
      </div>

      
      <div className="flex flex-col  justify-end items-end">
      <Link
          href={{
            pathname: `${pathname}${item.id ? `/${item.id}` : ''}`,
            query: item ? { doctorId: item.id } : undefined,
          }}
          // className="group relative aspect-square overflow-hidden rounded-lg"
          // className="bg-white rounded-lg shadow-md p-6 flex gap-6 items-start"

          onClick={() => {
            if (setSelectedDoctor) setSelectedDoctor(item);
            if (handleClick) handleClick(item.name, item.preSignedUrl, item.id);
          }}
        >
        <div
          className={`px-1 py-1 rounded text-sm font-semibold`}
        >
         <button
              className={`px-2 py-2  rounded-lg text-white transition-colors ${
                doctors.length > 0 && item.active
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (doctors.length > 0 && item.active) {
                  onClick?.(item.id);
                }
              }}
              disabled={doctors.length === 0 || !item.active}
            >
         {doctors.length > 0 && item.active ? 'Booking Available' : 'Booking Unavailable'}
            </button>
        </div>
        </Link>
        
      </div> */}


<div className="flex flex-col justify-start items-start">
  <div className={`px-1 py-1 rounded text-sm font-semibold`}>
    <span className="text-red-600 font-medium">
      {/* Filter doctors where isActive is true and count them */}
      {doctors.filter((doctor: any) => doctor.isActive).length} doctors available
    </span>
  </div>
  <span className="text-sm px-1 text-gray-600 mt-1">
    Book your appointment today
  </span>
</div>

<div className="flex flex-col justify-end items-end">
  {/* <Link
    href={{
      pathname: `${pathname}${item.id ? `/${item.id}` : ''}`,
      query: item ? { doctorId: item.id } : undefined,
    }}
    onClick={() => {
      if (setSelectedDoctor) setSelectedDoctor(item);
      if (handleClick) handleClick(item.name, item.preSignedUrl, item.id);
    }}
  >
    <div className={`px-1 py-1 rounded text-sm font-semibold`}>
      <button
        className={`px-2 py-2 rounded-lg text-white transition-colors ${
          doctors.filter((doctor: any) => doctor.isActive).length > 0 && item.active
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          if (doctors.filter((doctor: any) => doctor.isActive).length > 0 && item.active) {
            onClick?.(item.id);
          }
        }}
        disabled={doctors.filter((doctor: any) => doctor.isActive).length === 0 || !item.active}
      >
        {doctors.filter((doctor: any) => doctor.isActive).length > 0 && item.active
          ? 'Booking Available'
          : 'Booking Unavailable'}
      </button>
    </div>
  </Link> */}


<Link
  href={{
    pathname: `${pathname}${item.id ? `/${item.id}` : ''}`,
    query: item ? { doctorId: item.id } : undefined,
  }}
  onClick={() => {
    if (setSelectedDoctor) setSelectedDoctor(item);
    if (handleClick) handleClick(item.name, item.preSignedUrl, item.id);
  }}
>
  <div className="px-1 py-1 rounded text-sm font-semibold">
    <button
      className={`px-2 py-2 rounded-lg flex items-center justify-center text-white transition-colors group ${
        doctors.filter((doctor: any) => doctor.isActive).length > 0 && item.active
          ? 'bg-blue-600 hover:bg-blue-700'
          : 'bg-gray-400 cursor-not-allowed'
      }`}
      onClick={(e) => {
        e.stopPropagation();
        if (doctors.filter((doctor: any) => doctor.isActive).length > 0 && item.active) {
          onClick?.(item.id);
        }
      }}
      disabled={doctors.filter((doctor: any) => doctor.isActive).length === 0 || !item.active}
    >
      <span>
        {doctors.filter((doctor: any) => doctor.isActive).length > 0 && item.active
          ? 'Booking Available'
          : 'Booking Unavailable'}
      </span>
      <ArrowRight
        className="ml-2 w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 text-white transition-all duration-200"
        size={20}
      />
    </button>
  </div>
</Link>


</div>


      <div className="w-full py-1">
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          Available Medicines:
        </h3>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          {item.medicineResponses?.length > 0 ? (
            item.medicineResponses.map((med: any) => (
              <li key={med.id} className="mb-1">
                <span className="font-semibold">{med.name}:</span>{" "}
                {med.description || "No description available"}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No medicines available</p>
          )}
        </ul>
      </div>
   
      
    </div>
  );
};

export default HospitalImageCard;
