"use client";

import EditIcon from "@/components/svg/edit_icon";
import { usePetStore } from "@/store/petStore";
import Image from "next/image";
import { useEffect } from "react";
import DefaultImage from "../../../../../public/default_user.png";
import { getPetById } from "../action";

const Index = ({ params }: { params: { id: string } }) => {
  const [
    selectedPet,
    setSelectedPet,
    loading,
  ] = usePetStore((state: any) => [
    state.selectedPet,
    state.setSelectedPet,
    state.loading,
  
  ]);

  async function handleSelectPet() {
    const data = await getPetById(params.id);
    setSelectedPet(data);
  }

  useEffect(() => {
    handleSelectPet();
  }, [params.id]);

  if (loading) {
    <div>Loading...!</div>;
  }

  return (
    <div className="flex flex-col px-3 bg-white py-5 h-full w-full rounded-lg">
      <div className="flex relative">
        <EditIcon className="absolute top-0 right-0 cursor-pointer" />
        <div className="relative">
          <EditIcon className="absolute top-5 right-5 z-10 cursor-pointer" />
          {selectedPet?.preSignedUrl ? (
            <Image
              src={selectedPet?.preSignedUrl}
              alt="Pet Image"
              width={200}
              height={200}
              className="rounded-full border-4 object-cover h-[200px] w-[200px]"
            />
          ) : (
            <Image
              src={DefaultImage}
              className="rounded-full border-4"
              alt="default_img"
              height={200}
              width={200}
            />
          )}
        </div>
        <div className="grow flex flex-col gap-2 px-3 py-2">
          <div className="font-bold text-2xl flex gap-2 items-center">
            {selectedPet?.name} {" "}
          </div>
          <div className="font-semibold text-xl">
          &quot;{selectedPet?.description}&quot;
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;


