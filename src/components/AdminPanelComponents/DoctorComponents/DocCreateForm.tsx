import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createDoctor } from '@/app/admin/doctors/action';
import { MultiSelect } from '@/components/shared/multi-select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Doctor } from '@/lib/typings';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import {
  Building2,
  CalendarIcon,
  Clock,
  Mail,
  PawPrint,
  PenSquare,
  Phone,
  User,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDepartmentData } from '@/app/home/action';
import { useDepartmentStore } from '@/store/departmentStore';

const formSchema = z.object({
  firstName: z.string({ required_error: 'First name is required!' }),
  lastName: z.string({ required_error: 'Last name is required!' }),
  email: z.string().email('Please enter a valid email!'),
  phoneNo: z
    .string({ required_error: 'Phone number is required!' })
    .regex(
      /^[0]{1}[7]{1}[01245678]{1}[0-9]{7}$/,
      'Please enter a valid phone number'
    ),
  dateOfBirth: z.date({ required_error: 'Please select the date of birth!' }),
  gender: z.string({ required_error: 'Gender is required!' }),
  specializationId: z.string({
    required_error: 'Please select a specialization!',
  }),
  departmentId: z.number({
    required_error: 'Please select a deparment!',
  }),
  description: z.string({ required_error: 'Description is required!' }),
  duration: z.number({ required_error: 'Duration is required!' }),
  petIds: z.array(z.number()),
  qualification: z.string({ required_error: 'Qualification is required' }),
});

type Props = {
  specialization: any;
  pet: any;
  setOpen?: (open: boolean) => void;
  doctor?: Doctor;
};

const DocCreateForm = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [departments, setAllDepartments] = useDepartmentStore((state: any) => [
    state.departments,
    state.setAllDepartments,
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: 'undefined',
      lastName: undefined,
      email: undefined,
      phoneNo: undefined,
      dateOfBirth: undefined,
      gender: undefined,
      specializationId: undefined,
      description: undefined,
      duration: 15,
      qualification: undefined,
      petIds: [],
      departmentId:undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
     const responsedoc= await createDoctor(values);
     if(responsedoc){
      router.push('/admin/doctors');

     }
    } catch (error) {
      console.error('Failed to create department:', error);
    } finally {
      setLoading(false);
    }
  }

  console.log(form.getValues());
  async function fetchData() {
    const departmentData = await getDepartmentData();
    setAllDepartments(departmentData);
  }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 px-4 py-6 bg-white rounded-lg shadow-md"
      >
        {/* Section Header */}
        <div className="text-lg font-semibold text-gray-800 border-b pb-2">
          Doctor Information
        </div>

        {/* Personal Information */}
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-4">
            Personal Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Name */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-blue-500" />
                      <span>First Name</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter first name"
                      {...field}
                      className="border-gray-300 focus:border-blue-500 rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-blue-500" />
                      <span>Last Name</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter last name"
                      {...field}
                      className="border-gray-300 focus:border-blue-500 rounded-md"
                    />
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
                  <FormLabel className="text-black">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-5 w-5 text-blue-500" />
                      <span>Email</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="doctor@example.com"
                      {...field}
                      className="border-gray-300 focus:border-blue-500 rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Additional Details */}
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-4">
            Additional Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone Number */}
            <FormField
              control={form.control}
              name="phoneNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-5 w-5 text-blue-500" />
                      <span>Phone Number</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="07XXXXXXXX"
                      {...field}
                      className="border-gray-300 focus:border-blue-500 rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

         
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-5 w-5 text-blue-500" />
                      <span>Date of Birth</span>
                    </div>
                  </FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full pl-3 text-left font-normal border-gray-300 hover:bg-gray-50',
                            !field.value && 'text-gray-500'
                          )}
                        >
                          {field.value
                            ? format(field.value, 'PPP')
                            : 'Select date'}
                          <CalendarIcon className="ml-auto h-4 w-4 text-gray-500" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setOpen(false);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Name */}

            <FormField
              control={form.control}
              name="specializationId"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-black">
                    <div className="flex items-center space-x-2">
                      <PenSquare className="h-5 w-5 text-blue-500" />
                      <span>Specialization</span>
                    </div>
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select specialization" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {props.specialization.length > 0 ? (
                        props.specialization.map((specialization: any) => (
                          <SelectItem
                            key={specialization.id}
                            value={String(specialization.id)}
                          >
                            {specialization.specializationName}
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
              name="qualification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-5 w-5 text-blue-500" />
                      <span>Qualification</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Qualification" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="flex flex-col w-1/2">
                  <FormLabel className="text-black">
                    {/* Gender */}
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-blue-500" />
                      <span>Gender</span>
                    </div>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        
            <FormField
              control={form.control}
              name="petIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">
                    {/* Pets */}
                    <div className="flex items-center space-x-2">
                      <PawPrint className="h-5 w-5 text-blue-500" />
                      <span>Pets</span>
                    </div>
                  </FormLabel>
                  <MultiSelect
                    options={props.pet}
                    selectedValues={field.value || []}
                    onChange={(selected: any) => {
                      field.onChange(selected);
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
  <FormField
            control={form.control}
            name="departmentId"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel className="text-black">
                   <div className="flex items-center space-x-2">
                      <Building2 className="h-5 w-5 text-blue-500" />
                      <span>Deparment</span>
                    </div>
                    </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  // defaultValue={field.value}
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
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-blue-500" />
                      <span>Duration</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <div className="w-full flex items-center space-x-2">
                      <span className="font-semibold text-gray-600 text-sm">
                        15mins
                      </span>
                      <Slider
                        max={60}
                        step={15}
                        min={15}
                        onChange={(e: any) => {
                          field.onChange(parseInt(e.target.value));
                        }}
                      />
                      <span className="font-semibold text-gray-600 text-sm">
                        60mins
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full focus:outline-none">
                  <FormLabel className="text-black">
                    <div className="flex items-center space-x-2">
                      <PenSquare className="h-5 w-5 text-blue-500" />
                      <span>Description</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Doctor description"
                      className="resize-none w-full focus:outline-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DocCreateForm;
