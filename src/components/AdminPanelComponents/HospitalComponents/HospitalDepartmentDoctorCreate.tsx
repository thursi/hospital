'use client';

import { updateHospitalDepartDoc } from '@/app/admin/hospitals/action';
import { MultiSelect } from '@/components/shared/multi-select';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PawPrint } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  departmentId: z.string().nonempty('Department is required!'),
  // doctorIds: z
  // .array(z.number())
  // .min(1, "At least one doctor must be selected!"),
  doctorIds: z.array(z.number()),
});

type Props = {
  setOpen: (open: boolean) => void;
  reloadTable: () => void;
  department: Array<{ id: number; name: string }>;
  doctor: Array<{ id: number; name: string }>;
  id: number;
  onDepartmentSelect: (departmentId: any) => void;
};

const HospitalDepartmentDoctorCreate = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      departmentId: '',
      doctorIds: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    props.onDepartmentSelect(values.departmentId);

    const payload = {
      hospitalId: props.id,
      departmentDoctorRequests: [
        {
          departmentId: Number(values.departmentId),
          doctorIds: values.doctorIds.map(Number),
        },
      ],
    };

    try {
      // router.push('/admin/hospitals');
      const response = await updateHospitalDepartDoc(payload);
      if (response?.success === true) {
        // props.setOpen(false);
        props.reloadTable();
        router.push('/admin/hospitals');

        // router.back();
        // router.push('/admin/hospitals');
      }
    } catch (error) {
      // router.push('/admin/hospitals');
      console.error('Failed to update hospital department doctor:', error);
    } finally {
      setLoading(false);
    }
  }

  console.log(form.formState.errors);

  const departments = props.department || [];
  // const doctors = props.doctor || [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-2">
        <div className="w-full gap-2 space-y-4">
          <FormField
            control={form.control}
            name="departmentId"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel className="text-black">Department</FormLabel>
                {/* <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                > */}

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {departments.length > 0 ? (
                      departments.map((department: any) => (
                        <SelectItem
                          key={department.id}
                          value={String(department.id)}
                        >
                          {department.name}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="px-3 font-semibold text-gray-400 text-center">
                        No options
                      </div>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="doctorIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">
                  {/* Pets */}
                  <div className="flex items-center space-x-2">
                    <PawPrint className="h-5 w-5 text-blue-500" />
                    <span>Doctors</span>
                  </div>
                </FormLabel>
                {/* <MultiSelect
                  options={props.doctor}
                  selectedValues={field.value || []}
                  onChange={(selected: any) => {
                    field.onChange(selected);
                  }}
                /> */}

                <MultiSelect
                  options={props.doctor}
                  selectedValues={field.value || []}
                  onChange={(selected: any) => {
                    console.log('Selected Doctor IDs:', selected);
                    field.onChange(selected.map(Number));
                  }}
                />

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button className="bg-blue-600" type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default HospitalDepartmentDoctorCreate;
