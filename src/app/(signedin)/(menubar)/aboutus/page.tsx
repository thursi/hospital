import Image from "next/image";

const AboutUs = () => {
  return (
    <div className="bg-gray-100">
      <div className="w-full max-w-[1196px] pt-5 px-7 mx-auto">
        <div className="pl-2">
          <h2 className="font-bold text-3xl pt-16">About Us</h2>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="text-l pl-2 text-2xl text-gray-500">
            Your Pets Nutritional Health is Very Important & Our Priority
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-around items-center p-4 pb-20">
          <div className="flex flex-col items-center justify-center bg-white px-20 py-8 md:px-16 md:py-20 mb-4 md:mb-0 max-w-[250px] max-h-[150px]">
            <Image src="/star.png" alt="Icon 1" width={48} height={48} />
            <span className="text-xl whitespace-nowrap font-bold">
              Icon 1 Text
            </span>
          </div>
          <div className="flex flex-col items-center justify-center bg-white px-20 py-8 md:px-16 md:py-20 mb-4 md:mb-0 max-w-[250px] max-h-[150px]">
            <Image src="/star.png" alt="Icon 2" width={48} height={48} />
            <span className="text-xl whitespace-nowrap font-bold">
              Icon 2 Text
            </span>
          </div>
          <div className="flex flex-col items-center justify-center bg-white px-20 py-8 md:px-16 md:py-20 mb-4 md:mb-0 max-w-[250px] max-h-[150px]">
            <Image src="/star.png" alt="Icon 3" width={48} height={48} />
            <span className="text-xl whitespace-nowrap font-bold">
              Icon 3 Text
            </span>
          </div>
          <div className="flex flex-col items-center justify-center bg-white px-20 py-8 md:px-16 md:py-20 mb-4 md:mb-0 max-w-[250px] max-h-[150px]">
            <Image src="/star.png" alt="Icon 4" width={48} height={48} />
            <span className="text-xl whitespace-nowrap font-bold">
              Icon 4 Text
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="w-full max-w-[1196px] pt-5 px-7 mx-auto">
          <div className="pl-2">
            <h2 className="font-bold text-3xl pt-16">About Nutritional</h2>
          </div>
          <div className="flex flex-row justify-between items-center">
            <p className="text-l pl-2 text-2xl text-gray-500">
              Your Pets Nutritional Health is Very Important & Our Priority
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start pt-10 pl-2">
            <div className="flex-shrink-0 md:flex-grow">
              <Image
                src="/department.png"
                alt="Department Image"
                width={710}
                height={340}
                className="rounded"
              />
            </div>
            <div className="flex flex-col pt-4 md:pt-0 md:px-8 text-gray-500 flex-grow md:w-1/2">
              <div className="text-xs">
                Your Pets Nutritional Health is Very Important & Our Priority
              </div>
              <div className="pt-4 text-xs">
                We Always Focus On Helping Your Pet Have A Better Life & Health.
                Your Pets Nutritional Health is Very Important & Our Priority
                Online Consultation.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
