"use client";
import MultipleImagesProps from "@/components/SinglePageImage";
import { useDepartmentStore } from "@/store/departmentStore";
import { useEffect } from "react";
import { getDeparmentFilterData } from "../../../home/action";
import Loader from "@/components/Loader";

const Department = () => {
  const [departments, setAllDepartments, loading, setLoading] =
    useDepartmentStore((state: any) => [
      state.departments,
      state.setAllDepartments,
      state.loading,
      state.setLoading,
    ]);

  useEffect(() => {
    const fetchData = async () => {
      if (departments && departments.length > 0) return; // Skip fetch if data already exists
      try {
        setLoading(true);
        const departmentData = await getDeparmentFilterData({
          pageSize: 10,
          pageCount: 1,
        });
        setAllDepartments(departmentData?.records);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [departments, setAllDepartments, setLoading]); // Include relevant dependencies

  const departmentDatas = Array.isArray(departments)
    ? departments.map((department: any) => ({
        src: department.preSignedUrl,
        alt: department.image,
        textOverlay: department.name,
        label: department.name,
        id: department.id,
      }))
    : [];

  const handleClick = (imageName: string) => {
    console.log(`Image clicked: ${imageName}`);
  };

  if (loading || !departments) {
    return (
      <div className="mt-14 px-7 w-full h-full flex flex-col items-center py-4">
        <div className="w-full grow max-w-[1204px] justify-center items-center flex flex-col px-3 py-5 h-full rounded-lg">
          <Loader className="h-10 w-10" />
        </div>
      </div>
    );
  }

  return (
    <div id="departments" className="pb-8 pt-3">
      <MultipleImagesProps
        title="Departments"
        description="Your Pets Nutritional Health is Very Important & Our Priority"
        handleClick={handleClick}
        doctors={departments}
        pathname={"/departments"}
        query={departmentDatas}
      />
    </div>
  );
};

export default Department;
