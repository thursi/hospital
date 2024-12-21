"use client";
import DepartmentCreate from "@/components/AdminPanelComponents/DepartmentComponents/DepartmentCreate";
import { useDepartmentStore } from "@/store/departmentStore";
import { useEffect, useCallback } from "react";
import { DataTable } from "../../../components/AdminPanelComponents/data-table";
import { getDepartmentData } from "./action";
import { columns } from "./columns";

export default function DemoPage() {
  const [departments, setAllDepartments] = useDepartmentStore((state: any) => [
    state.departments,
    state.setAllDepartments,
  ]);

  const fetchData = useCallback(async () => {
    const data = await getDepartmentData(1, 10);
    console.log(data);
    setAllDepartments(data?.records);
  }, [setAllDepartments]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  

  return (
    <div className="container flex flex-col gap-4 mx-auto py-5 relative">
      <div className="self-end">
        <DepartmentCreate />
      </div>
      <DataTable columns={columns} data={departments} />
    </div>
  );
}
