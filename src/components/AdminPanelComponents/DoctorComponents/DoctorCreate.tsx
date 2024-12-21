"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import DoctorCreateForm from "./DoctorCreateForm";

type Props = {
  specialization: any;
  pet:any;
};

const DoctorCreate = (props: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="bg-red-500">Create</Button>
      </DialogTrigger>
      <DialogContent className="h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Doctor</DialogTitle>
        </DialogHeader>
        <DoctorCreateForm
          specialization={props.specialization}
          pet={props.pet}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DoctorCreate;
