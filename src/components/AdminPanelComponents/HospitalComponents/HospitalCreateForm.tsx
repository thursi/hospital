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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PawPrint, XIcon } from 'lucide-react';
import { MultiSelect } from '@/components/shared/multi-select';
import { createHospital } from '@/app/admin/hospitals/action';
import { HospitalCreate } from '@/lib/typings';

const formSchema = z.object({
  name: z.string().nonempty('Hospital name is required!'),
  description: z.string().default('').optional(), // Defaults to an empty string
  cityId: z.number().min(1, 'City is required!'),
  district: z.string().nonempty('District is required!'),
  province: z.string().nonempty('Province is required!'),
  address: z.string().nonempty('Address is required!'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  openTime: z.string().nonempty('Opening time is required!'),
  closeTime: z.string().nonempty('Closing time is required!'),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, 'Phone number must be numeric')
    .nonempty('Phone number is required!'),
  email: z.string().email('Enter a valid email!'),
  website: z.string().url('Enter a valid URL!').optional(),
  medicineIds: z.array(z.number()).nonempty('Please select at least one medicine!'),
});


type Props = {
  cities: Array<{ id: number; name: string }>;
  medicines: Array<{ id: number; name: string }>;
};
const HospitalCreateForm = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      cityId: undefined,
      district: '',
      province: '',
      address: '',
      latitude: 0,
      longitude: 0,
      openTime: '09:00:00',
      closeTime: '09:00:00',
      phoneNumber: '',
      email: '',
      website: '',
      medicineIds: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await createHospital({
  ...values,
  description: values.description || '', // Ensure description is always a string
} as HospitalCreate);


      console.log('Submitted data:', values);
      router.push('/admin/hospitals');
    } catch (error) {
      console.error('Failed to create hospital:', error);
    } finally {
      setLoading(false);
    }
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

         
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-8 right-10 text-gray-500 hover:text-gray-700"
        >
          <XIcon className="h-5 w-5" />
        </button>
        <div className="text-lg font-semibold text-gray-800 border-b pb-2">
          Hospital Information
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-black'>Hospital Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter hospital name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                 <FormLabel className='text-black'>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* City */}
          <FormField
            control={form.control}
            name="cityId"
            render={({ field }) => (
              <FormItem>
                 <FormLabel className='text-black'>City</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={field.value?.toString()}
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

          {/* District */}
          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                 <FormLabel className='text-black'>District</FormLabel>
                <FormControl>
                  <Input placeholder="Enter district" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Province */}
          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                 <FormLabel className='text-black'>Province</FormLabel>
                <FormControl>
                  <Input placeholder="Enter province" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
               <FormLabel className='text-black'>Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-6">
          {/* Opening Time */}
          <FormField
            control={form.control}
            name="openTime"
            render={({ field }) => (
              <FormItem>
                 <FormLabel className='text-black'>Opening Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Closing Time */}
          <FormField
            control={form.control}
            name="closeTime"
            render={({ field }) => (
              <FormItem>
                 <FormLabel className='text-black'>Closing Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                 <FormLabel className='text-black'>Phone Number</FormLabel>
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
                 <FormLabel className='text-black'>Email</FormLabel>
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
                 <FormLabel className='text-black'>Website</FormLabel>
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
                    {/* Pets */}
                    <div className="flex items-center space-x-2">
                      <PawPrint className="h-5 w-5 text-blue-500" />
                      <span>Vaccination</span>
                    </div>
                  </FormLabel>
                  <MultiSelect
                    options={props.medicines}
                    selectedValues={field.value || []}
                    onChange={(selected: any) => {
                      field.onChange(selected);
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" disabled={loading} className="bg-blue-500 text-white">
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default HospitalCreateForm;
