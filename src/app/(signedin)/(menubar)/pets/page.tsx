"use client";
import Header from "@/components/HomeComponent/Header";
import MultipleImagesProps from "@/components/SinglePageImage";
import { usePetStore } from "@/store/petStore";
import { useEffect } from "react";
import { getPetFilterData } from "../../../home/action";
import Loader from "@/components/Loader";

interface Pet {
  preSignedUrl: string;
  image: string;
  name: string;
}

const Pets = () => {
  const [pets, setAllPets, loading, setLoading] = usePetStore((state: any) => [
    state.pets,
    state.setAllPets,
    state.loading,
    state.setLoading,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const petData = await getPetFilterData({ pageSize: 10, pageCount: 1 });
        setAllPets(petData.records);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Optionally, set some state to display an error message to the user
      } finally {
        setLoading(false); // Ensure loading state is updated after the data fetching is done
      }
    };

    fetchData(); // Call the fetchData function
  }, [setAllPets, setLoading]); // Include setAllPets and setLoading in the dependency array

  const petdata = Array.isArray(pets)
    ? pets.map((pet: Pet) => ({
        src: pet.preSignedUrl,
        alt: pet.image,
        textOverlay: pet.name,
        label: pet.name,
      }))
    : [];

  console.log(pets);

  const handleClick = (imageName: string) => {
    console.log(`Image clicked: ${imageName}`);
  };

  if (loading || !pets) {
    return (
      <div className="mt-14 px-7 w-full h-full flex flex-col bg-gray-100 items-center py-4">
        <div className="w-full max-w-[1204px] justify-center items-center flex flex-col px-3 py-5 h-full rounded-lg">
          <Loader className="h-10 w-10" />
        </div>
      </div>
    );
  }

  return (
    <div id="pets" className="pb-8 pt-2 w-full">
      <MultipleImagesProps
        title="Pets Nutritional"
        description="Your Pets' Nutritional Health is Very Important & Our Priority"
        handleClick={handleClick}
        doctors={pets} 
        pathname="/pets"
      />
    </div>
  );
};

export default Pets;
