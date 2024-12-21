// components/InfoSection.tsx
import Image from 'next/image';
import React from 'react';

interface InfoSectionProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  date: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  date,
}) => (
  <div>
    <div className="border-l-2 border-red-500 pl-2 mt-8">
      <h2 className="font-bold text-2xl">{title}</h2>
    </div>
    <div className="flex flex-row justify-between items-center">
      <p className="text-l border-l-2 border-gray-300 pl-2">
        {description}
      </p>
    </div>
    <div className="relative flex items-start mb-4 mt-4 rounded overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={320}
        height={220}
        className="rounded"
      />
      <div className="absolute bottom-0 left-0 bg-opacity-70 text-white text-xl font-bold p-1 rounded-tl z-10">
        Vethouse – {date}
      </div>
    </div>
  </div>
);

export default InfoSection;
