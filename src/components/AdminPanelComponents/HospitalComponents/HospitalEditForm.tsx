'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { MultiSelect } from '@/components/shared/multi-select';
import { updateHospital } from '@/app/admin/hospitals/action';
import { PawPrint, XIcon } from 'lucide-react';
import { getDepartmentData } from '@/app/admin/departments/action';
import { useDepartmentStore } from '@/store/departmentStore';
import { useDoctorStore } from '@/store/doctorStore';
import { getDoctorData } from '@/app/admin/doctors/action';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().nonempty('Hospital name is required!'),
  description: z.string().default(''),
  cityId: z.number().min(1, 'City is required!'),
  district: z.string().nonempty('District is required!'),
  province: z.string().nonempty('Province is required!'),
  address: z.string().nonempty('Address is required!'),
  latitude: z.number().default(0),
  longitude: z.number().default(0),
  openTime: z.string().nonempty('Opening time is required!'),
  closeTime: z.string().nonempty('Closing time is required!'),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, 'Phone number must be numeric')
    .nonempty('Phone number is required!'),
  email: z.string().email('Enter a valid email!'),
  website: z.string().url('Enter a valid URL!').default(''),
  medicineIds: z
    .array(z.number())
    .nonempty('Please select at least one medicine!'),
});

type Props = {
  cities: Array<{ id: number; name: string }>;
  medicines: Array<{ id: number; name: string }>;
  hospital: {
    id: string;
    name: string;
    description: string;
    cityId: number;
    district: string;
    province: string;
    address: string;
    latitude: number;
    longitude: number;
    openTime: string;
    closeTime: string;
    phoneNumber: string;
    email: string;
    website: string;
    medicineIds: number[];
  };
};

const HospitalEditForm = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      cityId: 0,
      district: '',
      province: '',
      address: '',
      latitude: 0,
      longitude: 0,
      openTime: '09:00:00',
      closeTime: '17:00:00',
      phoneNumber: '',
      email: '',
      website: '',
      medicineIds: [],
    },
  });
  useEffect(() => {
    if (props.hospital) {
      form.reset({
        name: props.hospital.name || '',
        description: props.hospital.description || '',
        cityId: props.hospital.cityId || 0,
        district: props.hospital.district || '',
        province: props.hospital.province || '',
        address: props.hospital.address || '',
        latitude: props.hospital.latitude ?? 0,
        longitude: props.hospital.longitude ?? 0,
        openTime: props.hospital.openTime || '09:00:00',
        closeTime: props.hospital.closeTime || '17:00:00',
        phoneNumber: props.hospital.phoneNumber || '',
        email: props.hospital.email || '',
        website: props.hospital.website || '',
        medicineIds: props.hospital.medicineIds || [],
      });
      console.log('Form values after reset:', form.getValues());
    }
  }, [props.hospital, form]);

  // async function onSubmit(values: z.infer<typeof formSchema>) {
  //   setLoading(true);
  //   try {
  //     const hospitalData: {
  //       name: string;
  //       description: string;
  //       cityId: number;
  //       district: string;
  //       province: string;
  //       address: string;
  //       latitude: number;
  //       longitude: number;
  //       openTime: string;
  //       closeTime: string;
  //       phoneNumber: string;
  //       email: string;
  //       website: string;
  //       medicineIds: number[];
  //     } = {
  //       name: values.name,
  //       description: values.description,
  //       cityId: values.cityId,
  //       district: values.district,
  //       province: values.province,
  //       address: values.address,
  //       latitude: values.latitude,
  //       longitude: values.longitude,
  //       openTime: values.openTime,
  //       closeTime: values.closeTime,
  //       phoneNumber: values.phoneNumber,
  //       email: values.email,
  //       website: values.website,
  //       medicineIds: values.medicineIds,
  //     };

  //     await updateHospital(props.hospital.id, hospitalData);

  //     console.log('Updated data:', hospitalData);
  //     router.push('/admin/hospitals');
  //   } catch (error) {
  //     console.error('Failed to update hospital:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  //   async function onSubmit(values: z.infer<typeof formSchema>) {
  //   setLoading(true);
  //   try {
  //     const hospitalData = {
  //       name: values.name,
  //       description: values.description,
  //       cityId: values.cityId,
  //       district: values.district,
  //       province: values.province,
  //       address: values.address,
  //       latitude: values.latitude,
  //       longitude: values.longitude,
  //       openTime: values.openTime,
  //       closeTime: values.closeTime,
  //       phoneNumber: values.phoneNumber,
  //       email: values.email,
  //       website: values.website,
  //       medicineIds: values.medicineIds,
  //     };

  //     // Call the updateHospital function
  //     await updateHospital(props.hospital.id, hospitalData);

  //     console.log('Updated hospital data:', hospitalData);
  //     router.push('/admin/hospitals');
  //   } catch (error) {
  //     console.error('Failed to update hospital:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      // const hospitalData = {
      //   name: values.name,
      //   description: values.description,
      //   cityId: values.cityId,
      //   district: values.district,
      //   province: values.province,
      //   address: values.address,
      //   latitude: values.latitude,
      //   longitude: values.longitude,
      //   openTime: values.openTime,
      //   closeTime: values.closeTime,
      //   phoneNumber: values.phoneNumber,
      //   email: values.email,
      //   website: values.website,
      //   medicineIds: values.medicineIds,
      // };
      // console.log('Updated hospital data:1', hospitalData);

      const response = await updateHospital(props.hospital.id, values);

      // console.log('Updated hospital data:2', hospitalData);

      if (response?.success === true) {
        router.push('/admin/hospitals');
      }
    } catch (error) {
      console.error('Failed to update hospital:', error);
    } finally {
      setLoading(false);
    }
  }

  const [department, setAllDepartment] = useDepartmentStore((state: any) => [
    state.department,
    state.setAllDepartment,
  ]);

  
  const [  doctors,
    setAllDoctors,] = useDoctorStore((state: any) => [
      state.doctors,
      state.setAllDoctors,
  ]);

  async function fetchData() {
    const departments = await getDepartmentData();
    const doctor = await getDoctorData();
    setAllDepartment(departments);
    setAllDoctors(doctor);

  }

  

  const handleClose = () => {
    router.back(); 
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 bg-white rounded-lg shadow-md p-6"
      >


    

        <div className="flex items-center justify-between border-b pb-2">
            
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-8 right-10 text-gray-500 hover:text-gray-700"
        >
          <XIcon className="h-5 w-5" />
        </button>
          <div className="text-lg font-semibold text-gray-800">
            Hospital Information
          </div>
          {/* <div className="self-end">
            <DepartmentDoctorCreate department={department} doctor={doctors} id={props.hospital.id} />
          </div> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Hospital Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter hospital name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="cityId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">City</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {props.cities.map((city) => (
                      <SelectItem key={city.id} value={city.id.toString()}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">District</FormLabel>
                <FormControl>
                  <Input placeholder="Enter district" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Province</FormLabel>
                <FormControl>
                  <Input placeholder="Enter province" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="openTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Opening Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="closeTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Closing Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Website */}
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Website</FormLabel>
                <FormControl>
                  <Input placeholder="Enter website URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="medicineIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">
                  <div className="flex items-center space-x-2">
                    <PawPrint className="h-5 w-5 text-blue-500" />
                    <span>Vaccination</span>
                  </div>
                </FormLabel>
                <MultiSelect
                  options={props.medicines}
                  selectedValues={field.value}
                  onChange={(selected: number[]) => field.onChange(selected)}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default HospitalEditForm;
