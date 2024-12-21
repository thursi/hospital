'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import SpecializationCreateForm from '../SpecializationComponents/SpecializationCreateForm';
import HospitalDepartmentDoctorCreate from './HospitalDepartmentDoctorCreate';

type Props = {
  department: any;
  doctor: any;
  id: any;
};

const DepartmentDoctorCreate = (props: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="self-end flex items-center">
          <Button className="bg-blue-600 text-white p-2 rounded-xl">
            <PlusIcon className="mr-2 h-4 w-4" /> {/* The PlusIcon */}
            Create Hospital Department Doctor
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="h-auto overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Specialization</DialogTitle>
        </DialogHeader>
        <HospitalDepartmentDoctorCreate
          department={props.department}
          doctor={props.doctor}
          setOpen={setOpen}
          reloadTable={function (): void {
            throw new Error('Function not implemented.');
          }}
          id={props.id}
          onDepartmentSelect={function (departmentId: any): void {
            throw new Error('Function not implemented.');
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DepartmentDoctorCreate;
