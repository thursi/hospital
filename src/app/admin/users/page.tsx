"use client";
import { DataTable } from "@/components/AdminPanelComponents/data-table";
import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";
import { getUserData } from "./action";
import { columns } from "./columns";
import { FilterIcon, User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function Index() {
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [selectedSelectedRole, setSelectedRole] = useState<any | undefined>(
    null
  );
  const [users, setAllUsers] = useUserStore((state: any) => [
    state.users,
    state.setAllUsers,
  ]);
  const [userRecords, setUserRecords] = useState<any>(undefined);
  const [filterParams, setFilterParams] = useState({
    pageSize: 10,
    pageCount: 1,
  });

  async function fetchData() {
    const data = await getUserData(
      filterParams.pageCount,
      filterParams.pageSize,
      selectedSelectedRole
    );
    setAllUsers(data);
    setUserRecords(data);
  }
  useEffect(() => {
    fetchData();
  }, [selectedSelectedRole, filterParams]);

  const userRole = [
    { id: 1, label: "User", value: "USER" },
    { id: 2, label: "Admin", value: "ADMIN" },
    { id: 3, label: "Doctor", value: "DOCTOR" },
  ];

  return (
    <div className="container flex flex-col gap-4 mx-auto py-5 relative">
      <div className="flex items-center">
        <User className="mr-2 text-black font-bold  group-hover:text-black transition-colors duration-200" />
        <div className="font-bold text-2xl">Users</div>
      </div>
      <div
        className="flex items-center justify-end p-3 cursor-pointer"
        onClick={() => setIsFiltersOpen((prev: boolean) => !prev)}
      >
        <FilterIcon className="h-6 w-6 text-[#8D9FBD] " />
        <div className="font-semibold text-[#8D9FBD] ml-2">Filters</div>
      </div>

      <div>
        {isFiltersOpen && (
          <div className="flex gap-4 items-center">
            {/* Specialization Dropdown */}
            <div className="flex-1">
              <Select onValueChange={(value) => setSelectedRole(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select User Role" />
                </SelectTrigger>
                <SelectContent>
                  {userRole.length > 0 ? (
                    userRole.map((item: any) => (
                      <SelectItem key={item.id} value={String(item.value)}>
                        {item.label}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="px-3 font-semibold text-gray-400 text-center">
                      No options
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
      <div className="self-end"></div>
      <DataTable
        columns={columns}
        data={users?.records}
        records={users}
        pageSize={users?.pageSize}
        handleFilter={(pageNumber, pageSize) => {
          setFilterParams((prevParams) => ({
            ...prevParams,
            pageCount: pageNumber,
            pageSize: pageSize,
          }));
        }}
      />
    </div>
  );
}
