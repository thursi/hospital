import { ArrowRight } from 'lucide-react';
import React from 'react';

const ServiceCard = ({ icon, title, subtitle, isMain }: any) => {
  return (
    <div
      className={`
      flex items-center justify-between gap-4 p-4 rounded-xl shadow-sm hover:shadow-md transition-all
      ${isMain ? 'bg-[#37529B]' : 'bg-white'}
    `}
    >
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">{icon}</div>
        <div>
          <h3
            className={`font-medium ${isMain ? 'text-white' : 'text-gray-800'}`}
          >
            {title}
          </h3>
          <p
            className={`text-sm ${
              isMain ? 'text-blue-100/80' : 'text-gray-400'
            }`}
          >
            {subtitle}
          </p>
        </div>
      </div>
      {!isMain && (
        <button
          // className="px-4 py-1.5 bg-[#85DCCD] text-white rounded-lg text-sm"

          className="px-4 py-1.5 bg-[#85DCCD] text-white rounded-lg text-sm flex items-center justify-center group  hover:bg-[#85DCCD]-700 font-medium  transition-colors"
        >
          Click
          <ArrowRight
            className="ml-2 w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 text-white transition-all duration-200"
            size={20}
          />
        </button>
      )}
    </div>
  );
};

export default ServiceCard;
