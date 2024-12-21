"use client";

import { DataTable } from "@/components/AdminPanelComponents/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBookingStore } from "@/store/bookingStore";
import { useEffect, useState, useCallback } from "react";
import { getBookingData } from "./action";
import { doctorColumns, medicinesColumns } from "./columns";

export default function Index() {
  const [bookings, setAllBookings] = useBookingStore((state: any) => [
    state.bookings,
    state.setAllBookings,
  ]);

  const [currentTab, setCurrentTab] = useState("doctors");

  const fetchData = useCallback(async () => {
    const data = await getBookingData(1, 10);
    setAllBookings(data?.records);
  }, [setAllBookings]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  const filteredBookings = bookings.filter((booking: any) =>
    currentTab === "doctors"
      ? booking.bookingType === "DOCTOR"
      : booking.bookingType === "MEDICINE"
  );
  return (
    <div className="container flex flex-col gap-4 mx-auto py-5 relative">
      <Tabs
        defaultValue="doctors"
        className="w-full py-2"
        onValueChange={(value) => setCurrentTab(value)}
      >
        <TabsList>
          <TabsTrigger value="doctors">Doctor Appointments</TabsTrigger>
          <TabsTrigger value="medicines">Medicine Appointments</TabsTrigger>
        </TabsList>
        <TabsContent value="doctors">
          <DataTable columns={doctorColumns} data={filteredBookings} />
        </TabsContent>
        <TabsContent value="medicines">
          <DataTable columns={medicinesColumns} data={filteredBookings} />
        </TabsContent>
      </Tabs>
      {/* <Filteration getApi={fetchData} /> */}
    </div>
  );
}