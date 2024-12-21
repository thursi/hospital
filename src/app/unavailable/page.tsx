'use client'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import UnavailablePic from "../../../public/unavailable_pic.png";

const Index = () => {
  const router = useRouter();
  return (
    <div className="w-full h-screen flex-col flex">
      <div className="w-full h-full flex flex-col relative gap-3 justify-center items-center">
        <Image src={UnavailablePic} alt={"unavailable"} />
        <div className="text-3xl font-bold w-1/3 text-center">
          Oops! Seems like you don&apos;t have access to this page.
        </div>
        <div className="w-fit">
          <Button
            onClick={() => {
              router.back();
            }}
            className="text-xl rounded-2xl font-semibold"
          >
            Go back!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
