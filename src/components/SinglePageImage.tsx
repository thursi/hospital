"use client";
import Image from "next/image";
import Link from "next/link";

interface MultipleImagesProps {
  title: string;
  description: string;
  handleClick: (imageName: any, image: any, id: any) => void;
  pathname?: string;
  doctors: {
    id?: string;
    preSignedUrl: string;
    name: string;
    departmentName: string;
    description?: string;
    specializationName?: string;
    dayTimeSlotResponses?: [];
  }[];
  query?: [] | any;
}

const MultipleImagesProps: React.FC<MultipleImagesProps> = ({
  title,
  description,
  doctors,
  handleClick,
  pathname,
}) => {
  const defaultImage = "/department.png";
  return (
    <div className="w-full container pt-20 pb-20 px-0 md:px-7 mx-auto">
      <div className="border-l-2 border-red-500 pl-2">
        <h2 className="font-bold text-2xl">{title}</h2>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p className="text-l border-l-2 border-white-500 pl-2">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-5">
        {doctors.map((image, index) => (
          <Link
            key={index}
            href={{
              pathname: `${pathname}${image.id ? `/${image.id}` : ""}`,
            }}
            onClick={() => handleClick(image.name, image.preSignedUrl, image.id)}
            className="cursor-pointer relative overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
            <div className="absolute bottom-0 left-0 w-full bg-gray-800 bg-opacity-60 text-white text-center p-2 shadow-md md:bg-opacity-10 md:text-left">
              <span className="text-base md:text-lg truncate">
                {image.name}
              </span>
            </div>
            <Image
              src={image.preSignedUrl || defaultImage}
              width={1000}
              height={1000}
              alt={image.name}
              className="w-full h-60 object-cover object-top md:w-100 md:h-80 transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MultipleImagesProps;
