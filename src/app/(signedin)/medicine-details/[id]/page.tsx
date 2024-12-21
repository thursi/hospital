"use client";
import DaySlot from "@/components/shared/day-slot";
import { Button } from "@/components/ui/button";
import { useMedicineStore } from "@/store/medicinesStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DefaultImage from "../../../../../public/default_user.png";
import { getMedicinceById } from "./action";

const Index = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [dloading, setdLoading] = useState<boolean>(true);
  const [selectedMedicine, setSelectedMedicine, loading] = useMedicineStore(
    (state: any) => [
      state.selectedMedicine,
      state.setSelectedMedicine,
      state.loading,
    ]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMedicinceById(params.id);
        setSelectedMedicine(response);
      } catch (error) {
        console.error("Failed to fetch medicine data:", error);
      } finally {
        setdLoading(false);
      }
    };

    fetchData();
  }, [params.id, setSelectedMedicine]); // Include setSelectedMedicine in the dependency array

  if (dloading && !selectedMedicine) {
    return (
      <div className="mt-14 px-7 w-full flex flex-col bg-gray-100 items-center py-4">
        <div className="w-full max-w-[1204px] flex flex-col px-3 py-5 h-full rounded-lg">
          Loading...!
        </div>
      </div>
    );
  }

  return (
    <div className="mt-14 px-7 w-full flex flex-col items-center py-4">
      <div className="w-full flex flex-col max-w-[1204px] gap-y-3">
        <div className="w-full flex flex-col px-3 bg-white py-5 h-full rounded-lg">
          <div className="w-full flex flex-col items-center md:flex-row md:justify-start relative">
            <div className="relative">
              {selectedMedicine?.preSignedUrl ? (
                <Image
                  src={selectedMedicine?.preSignedUrl}
                  alt="Medicine Image"
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
            <div className="grow w-1/2 min-w-fit items-center md:items-start flex flex-col gap-2 px-3 py-2">
              <div className="font-bold text-2xl flex gap-2 items-center">
                {selectedMedicine?.name}
              </div>
              <div>
                <div className="font-semibold mb-1">
                  {selectedMedicine?.specializationName}
                </div>
                <div className="font-semibold mb-2">
                  {selectedMedicine?.departmentName}
                </div>
              </div>
              <div className="flex flex-col items-start">
                <div className="font-semibold text-xl">
                  &quot;{selectedMedicine?.description}&quot;
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col px-3 bg-white py-5 rounded-lg">
          <DaySlot daySlots={selectedMedicine?.dayTimeSlotResponses} />
        </div>
        <div className="w-full relative flex md:justify-end">
          <Button
            onClick={() => {
              router.push(
                `/appointmentdoctor?medicineId=${selectedMedicine?.id}`
              );
            }}
            className="w-full md:w-fit md:px-3"
          >
            Book for Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
