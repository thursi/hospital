"use client";
import Header from "@/components/HomeComponent/Header";
import MultipleImagesProps from "@/components/SinglePageImage";
import { useMedicineStore } from "@/store/medicinesStore";
import { useEffect } from "react";
import { getMedicineFilterData } from "../../../home/action";
import Loader from "@/components/Loader";

interface Medicine {
  preSignedUrl: string;
  image: string;
  name: string;
}

const Medicines = () => {
  const [medicines, setAllMedicines, loading, setLoading] = useMedicineStore(
    (state: any) => [
      state.medicines,
      state.setAllMedicines,
      state.loading,
      state.setLoading,
    ]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const medicinesData = await getMedicineFilterData({
          pageSize: 10,
          pageCount: 1,
        });
        setAllMedicines(medicinesData.records);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [setAllMedicines, setLoading]);

  const handleClick = (imageName: string) => {
    console.log(`Image clicked: ${imageName}`);
  };

  if (loading || !medicines) {
    return (
      <div className="mt-14 px-7 w-full h-full flex flex-col bg-gray-100 items-center py-4">
        <div className="w-full max-w-[1204px] justify-center items-center flex flex-col px-3 py-5 h-full rounded-lg">
          <Loader className="h-10 w-10" />
        </div>
      </div>
    );
  }

  return (
    <div id="medicines" className="pb-8 pt-2 w-full">
      <MultipleImagesProps
        title="Medicines"
        description="Discover our range of medicines for your health needs."
        handleClick={handleClick}
        pathname="medicines"
        doctors={medicines}
      />
    </div>
  );
};

export default Medicines;
