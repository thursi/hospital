"use client";
import Image from "next/image";

interface ImageCalenderProps {
  doctors: {
    imageDescription?: string;
    src: string;
    alt: string;
    textOverlay: string;
    date?: string;
  }[];
  handleClick: (imageName: string, Name: string, scrName: string) => void;
}

const ImageCalender: React.FC<ImageCalenderProps> = ({
  doctors,
  handleClick,
}) => {
  return (
    <div className="w-full pt-5 px-7 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 pt-5">
        {doctors.map((image, index) => (
          <div
            key={index}
            onClick={() => handleClick(image.alt, image.src, image.textOverlay)}
            className="relative cursor-pointer"
          >
            <div className="relative overflow-hidden">
              <Image
                src={image.src}
                width={400}
                height={200}
                alt={image.alt}
                className="w-[400px] h-[200px] object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div
              style={{ height: image.imageDescription ? 115 : "auto" }}
              className="bg-white p-2"
            >
              <div className="text-red-500  hover:text-black text-xl">
                {image.textOverlay}
              </div>
              {image.imageDescription && (
                <div className="mb-2 text-gray-600 text-xs">
                  {image.imageDescription}
                </div>
              )}
              <div className="flex items-center text-xs pb-3 font-bold text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {image.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCalender;
