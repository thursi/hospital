// components/Dropdown.tsx
import { createAppointment } from '@/app/(signedin)/(menubar)/appointmentdoctor/action';
import { getDoctorData } from '@/app/home/action';
import { getMedicineData } from '@/app/admin/medicines/action';
import { Button } from '@/components/ui/button';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Doctor, Medicine } from '@/lib/typings';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Eye, EyeOff } from 'lucide-react';
import moment from 'moment';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import TimePicker from './shared/time-picker';
import { Calendar } from './ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';
import { useDoctorStore } from '@/store/doctorStore';
import Loader from './Loader';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { loginUser } from '@/app/auth/action';
import { usePetStore } from '@/store/petStore';
import { getAllPets } from '@/api/route';
import SuccessModal from './ui/popup';
interface AppointmentProps {
  userId: string | undefined;
  message: string;
  startDate: string;
  serialNumber: string;
  options: { label: string; value: string }[];
  doctors: { label: string; value: string }[];
  medicines: { label: string; value: string }[];
  selectedValue: string;
  selectedDoctor: any;
  onChange: (value: string) => void;
  handleDateChange: (value: string) => void;
  handleSerialNumberChange: (value: string) => void;
  handleDoctorChange: (value: string) => void;
  handleMedicineChange: (value: string) => void;
  handleMessageChange: (value: string) => void;
  handleCalendarChange: (value: string) => void;
  login?: any;
}
interface PetType {
  id: number;
  name: string;
}

const formSchema = z.object({
  id: z.string({ required_error: 'Please select an option!' }),
  bookingDate: z.date({
    required_error: 'Please select a date for the appointment!',
  }),
  time: z.string({
    required_error: 'Please select a time for the appointment!',
  }),
  description: z.string({
    required_error: 'Please Enter your reason for the appointment!',
  }),
  bookingType: z.string({
    required_error: 'Appointment Type is not selected!',
  }),
  // userId: z.number(),
  petName: z.string({ required_error: "Please Enter your pet's name!" }),
  petAge: z.number({ required_error: "Please select your pet's Age!" }),
  petType: z.string({ required_error: 'Please select the pet type!' }),
});

const signInFormSchema = z.object({
  email: z
    .string({ required_error: 'Please enter your email!' })
    .email('Please enter a valid email!'),
  password: z.string({ required_error: 'Please enter your password!' }),
});

const Appointment: React.FC<AppointmentProps> = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [login, setLogin] = useAuthStore((state) => [
    state.login,
    state.setLogin,
  ]);

  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: searchParams.get('doctorId')
        ? searchParams.get('doctorId')!
        : searchParams.get('medicineId')
        ? searchParams.get('medicineId')!
        : undefined,
      bookingDate: undefined,
      time: undefined,
      description: undefined,
      bookingType: searchParams.get('doctorId') ? 'DOCTOR' : 'MEDICINE',
      // userId: login?.userId,
      petName: undefined,
      petAge: 1,
      petType: undefined,
    },
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [loginSucess, setloginSucess] = useState<string | null>(null);
  const [formSucess, setFormSucess] = useState<string | null>(null);

  const [showMessage, setshowMessage] = useState<boolean>(false);
  const [showBook, setshowBook] = useState<boolean>(false);

  const [
    doctors,
    setAllDoctors,
    setSelectedDoctor,
    // selectedDoctor,
    setLoading,
  ] = useDoctorStore((state: any) => [
    state.doctors,
    state.setAllDoctors,
    state.setSelectedDoctor,
    // state.selectedDoctor,
    state.setLoading,
  ]);
  const [pet, setAllPet, setSelectedPet] = usePetStore((state: any) => [
    state.pet,
    state.setAllPet,
    state.setSelectedPet,
  ]);

  const [medicine, setAllMedicines] = useState<Medicine[]>([]);

  const [selecteddDoctor, setSelecteddDoctor] = useState<string | null>(null);
  const [selectedMedicine, setSelectedMedicine] = useState<string | null>(null);

  const [loadingSub, setLoadingSub] = useState(false);

  const signInForm = useForm({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Memoize fetchData using useCallback
  const fetchData = useCallback(async () => {
    try {
      const [doctorData, medicineData, petsData] = await Promise.all([
        getDoctorData(),
        getMedicineData(),
        getAllPets(),
      ]);

      if (searchParams.get('doctorId')) {
        setSelecteddDoctor(searchParams.get('doctorId')!);
      } else if (searchParams.get('medicineId')) {
        setSelectedMedicine(searchParams.get('medicineId')!);
      }

      setAllDoctors(doctorData);
      setAllMedicines(medicineData);
      setAllPet(petsData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [setAllDoctors, setAllMedicines, setAllPet, searchParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('thuC', {
      ...values,
      bookingDate: moment(values.bookingDate).format('YYYY-MM-DD'),
    });
    createAppointment({
      ...values,
      bookingDate: moment(values.bookingDate).format('YYYY-MM-DD'),
      // userId: values.userId.toString(),
      userId: login?.userId.toString(),
    }).then((res: any) => {
      if (res.success) {
        toast.success(res.message);
        router.push('/');
      } else if (res.success === false) {
        toast.error(res.message);
      } else {
        toast.error('Oops! Something went wrong. Please try again!');
      }
    });
  }

  const handleSignIn = async (values: z.infer<typeof signInFormSchema>) => {
    setLoading(true);
    const response = await loginUser({
      email: values.email,
      password: values.password,
    });

    if (response.success) {
      setLogin(response);
      toast.success(response.message);
      setshowMessage(true);
      setIsDialogOpen(false);
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  };

  const onSubmitForm = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    createAppointment({
      ...values,
      bookingDate: moment(values?.bookingDate).format('YYYY-MM-DD'),
      // userId: values?.userId ===undefined ?login?.userId : values.userId.toString()
      userId: login?.userId,
    }).then((res: any) => {
      if (res.success) {
        setFormSucess(res.message);
        setshowBook(true);
        // router.push('/home');
      } else {
        toast.error(res.message);
        setIsSubmitting(false);
      }
    });
  };

  const handleClick = async () => {
    console.log('Modal OK button clicked!');
    setshowBook(false);
    router.push('/');
  };
  if (!medicine && searchParams.get('medicineId')) {
    return (
      <div className="w-full">
        <div className="md:max-w-md gap-3 w-md flex flex-col items-center px-2 py-10 border rounded shadow-md my-8 bg-white">
          <Loader className="h-10 w-10" />
        </div>
      </div>
    );
  }

  if (!doctors && searchParams.get('doctorId')) {
    return (
      <div className="w-full">
        <div className="md:max-w-md gap-3 w-md flex flex-col items-center px-2 py-10 border rounded shadow-md my-8 bg-white">
          <Loader className="h-10 w-10" />
        </div>
      </div>
    );
  }
  const petTypes: PetType[] = [
    { id: 1, name: 'Dog' },
    { id: 2, name: 'Cat' },
    { id: 3, name: 'Rabbit' },
    { id: 4, name: 'Hamster' },
  ];

  return (
    <div className="w-full">
      {/* <div className="flex w-full grow md:justify-self-end items-center md:h-full flex-col gap-5 p-6 md:max-w-[470px] //shadow-md  bg-white border rounded  h-full px-8 py-5"> */}
      <div className="flex w-full grow md:justify-self-end items-center md:h-full flex-col gap-5 p-6 md:max-w-[470px]   bg-white border rounded  h-full px-8 py-5">
        <h2 className="text-xl flex w-full justify-center text-center mb-2">
          Appointment Booking
        </h2>

        <div className={`${!login ? 'blur' : 'remove-blur'}`}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitForm)}
              className="space-y-3 flex flex-col px-2 w-full"
            >
              <div className="flex flex-col md:flex-row gap-2 w-full">
                <FormField
                  control={form.control}
                  name="petName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      {' '}
                      <FormLabel className="text-xs md:text-md text-left">
                        {' '}
                        Your Pet&apos;s Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Pet's name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="petAge"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      {' '}
                      <FormLabel className="text-xs md:text-md text-left">
                        {' '}
                        Your Pet&apos;s Age
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Select.."
                          className="w-full"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-2 w-full">
                <FormField
                  control={form.control}
                  name="petType"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      {' '}
                      {/* Ensures equal growth */}
                      <FormLabel className="text-xs md:text-md text-left">
                        Your Pet&apos;s Type
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            console.log(value);
                            field.onChange(value);
                            setLoading(true);
                            setSelectedPet(
                              pet.find((pee: any) => pee.id === parseInt(value))
                            );
                          }}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            {field.value
                              ? pet.find(
                                  (pee: any) => pee.id === parseInt(field.value)
                                )?.name
                              : 'Select an option'}
                          </SelectTrigger>
                          <SelectContent>
                            {pet.length ? (
                              pet.map((pee: any) => (
                                <SelectItem key={pee.id} value={pee.id}>
                                  {pee.name}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem disabled value={''}>
                                No options
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-2 w-full">
                {searchParams.get('doctorId') && (
                  <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                      <FormItem className="md:w-1/2 w-full">
                        <FormLabel className="text-xs md:text-md">
                          Select a Doctor
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              console.log('dated', value);
                              field.onChange(value);
                              // setSelecteddDoctor(value);
                              setLoading(true);
                              setSelectedDoctor(
                                doctors.find(
                                  (doc: any) => doc.id === parseInt(value)
                                )
                              );
                            }}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              {/* <SelectValue> */}
                              {field.value
                                ? doctors.find(
                                    (doc: any) =>
                                      doc.id === parseInt(field.value)
                                  )?.name
                                : 'Select an option'}
                              {/* </SelectValue> */}
                            </SelectTrigger>
                            <SelectContent>
                              {doctors.length ? (
                                doctors.map((doc: any) => (
                                  <SelectItem key={doc.id} value={doc.id}>
                                    {doc.name}
                                  </SelectItem>
                                ))
                              ) : (
                                <SelectItem disabled value={''}>
                                  No options
                                </SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {searchParams.get('medicineId') && (
                  <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                      <FormItem className="md:w-1/2 w-full">
                        <FormLabel className="text-xs md:text-md">
                          Select Medicine
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              setSelectedMedicine(value);
                            }}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a medicine">
                                {field.value
                                  ? medicine.find(
                                      (med) => med.id === field.value
                                    )?.name
                                  : 'Select an option'}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {medicine.length ? (
                                medicine.map((med) => (
                                  <SelectItem key={med.id} value={med.id}>
                                    {med.name}
                                  </SelectItem>
                                ))
                              ) : (
                                <SelectItem disabled value={''}>
                                  No options
                                </SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <div className="flex flex-col w-full md:w-full md:flex-row gap-2 ">
                {searchParams.get('doctorId') && login && (
                  <FormField
                    control={form.control}
                    name="bookingDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-1 grow">
                        <FormLabel className="text-xs md:text-md">
                          Appointment Date
                        </FormLabel>
                        <Popover
                          open={isCalendarOpen}
                          onOpenChange={setCalendarOpen}
                        >
                          {/* <Popover> */}
                          <PopoverTrigger
                            disabled={selecteddDoctor ? false : true}
                            asChild
                          >
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'yyyy-MM-dd')
                                ) : (
                                  <span className="">Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            {doctors
                              .find(
                                (doctor: Doctor) =>
                                  doctor.id === selecteddDoctor
                              )
                              ?.dayTimeSlotResponses.some(
                                (day: any) =>
                                  day.day ===
                                  moment(date).format('dddd').toUpperCase()
                              )}

                            <Calendar
                              mode="single"
                              selected={new Date(field.value)}
                              onSelect={(date) => {
                                field.onChange(date);
                                setCalendarOpen(false);
                              }}
                              disabled={(date) => {
                                const doctorAvailability = doctors.find(
                                  (doc: Doctor) =>
                                    doc.id == selecteddDoctor?.toString()
                                )?.dayTimeSlotResponses;

                                if (!doctorAvailability) return true;

                                const isDateAvailable = doctorAvailability.some(
                                  (day: any) => {
                                    return (
                                      day.day ===
                                      moment(date).format('dddd').toUpperCase()
                                    );
                                  }
                                );

                                return (
                                  date < new Date() ||
                                  date < new Date('1900-01-01') ||
                                  !isDateAvailable
                                );
                              }}
                              minimized-calendar
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {searchParams.get('medicineId') && (
                  <FormField
                    control={form.control}
                    name="bookingDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-1 grow">
                        <FormLabel className="text-xs md:text-md">
                          Appointment Date
                        </FormLabel>

                        <Popover>
                          <PopoverTrigger
                            disabled={selectedMedicine ? false : true}
                            asChild
                          >
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span className="">Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            {medicine
                              .find(
                                (medicine: Medicine) =>
                                  medicine.id === selectedMedicine
                              )
                              ?.dayTimeSlotResponses.some(
                                (day: any) =>
                                  day.day ===
                                  moment(date).format('dddd').toUpperCase()
                              )}
                            <Calendar
                              mode="single"
                              selected={new Date(field.value)}
                              onSelect={(date) => field.onChange(date)}
                              disabled={(date) => {
                                const medicineAvailability = medicine.find(
                                  (doc: Medicine) =>
                                    doc.id == selectedMedicine?.toString()
                                )?.dayTimeSlotResponses;

                                if (!medicineAvailability) return true; // If no availability, disable all dates

                                const isDateAvailable =
                                  medicineAvailability.some((day: any) => {
                                    return (
                                      day.day ===
                                      moment(date).format('dddd').toUpperCase()
                                    );
                                  });

                                return (
                                  date < new Date() ||
                                  date < new Date('1900-01-01') ||
                                  !isDateAvailable
                                );
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {searchParams.get('doctorId') ? (
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-1 grow">
                        <FormLabel className="text-xs md:text-md">
                          Select a time
                        </FormLabel>
                        <FormControl>
                          <TimePicker
                            disabled={
                              form.getValues('bookingDate') ? false : true
                            }
                            values={form.getValues()}
                            appointmentTimes={
                              doctors
                                .find(
                                  (doc: Doctor) =>
                                    doc.id == selecteddDoctor?.toString()
                                )
                                ?.dayTimeSlotResponses?.find(
                                  (day: any) =>
                                    day.day ===
                                    moment(form.getValues('bookingDate'))
                                      .format('dddd')
                                      .toUpperCase()
                                )?.appointmentTimes
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <div className="flex flex-col md:flex-row gap-2 w-full">
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1 grow">
                          <FormLabel className="text-xs md:text-md">
                            Select a time
                          </FormLabel>
                          <FormControl>
                            <TimePicker
                              disabled={
                                form.getValues('bookingDate') ? false : true
                              }
                              values={form.getValues()}
                              appointmentTimes={
                                medicine
                                  .find(
                                    (doc: Medicine) =>
                                      doc.id == selectedMedicine?.toString()
                                  )
                                  ?.dayTimeSlotResponses?.find(
                                    (day: any) =>
                                      day.day ===
                                      moment(form.getValues('bookingDate'))
                                        .format('dddd')
                                        .toUpperCase()
                                  )?.appointmentTimes
                              }
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col md:flex-row gap-2 w-full">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full ">
                      <FormLabel className="text-xs md:text-md">
                        Your Reason for the appointment
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your reason here..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* </div> */}

              {login && (
                <button
                  className="w-full bg-black text-white py-2  px-4 rounded-lg hover:bg-gray-800"
                  type="submit"
                  disabled={isSubmitting}
                  // onClick={() => form.getValues ? onSubmitForm({ ...form.getValues(), userId: login?.userId }) : ''}
                >
                  Submit
                </button>
              )}
            </form>
          </Form>
        </div>
        {!login ? (
          <div className="space-y-3 flex flex-col px-2 w-full">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button
                  className="w-full bg-black text-white py-2  px-4 rounded-lg hover:bg-gray-800"
                  type="submit"
                >
                  Login to continue
                </button>
                {/* </a> */}
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Login</DialogTitle>
                  <DialogDescription>
                    Enter your credentials to log in.
                  </DialogDescription>
                </DialogHeader>
                <Form {...signInForm}>
                  <form onSubmit={signInForm.handleSubmit(handleSignIn)}>
                    <FormField
                      control={signInForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Email Address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signInForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm"
                              >
                                {showPassword ? (
                                  <Eye className="h-6 w-6 opacity-50" />
                                ) : (
                                  <EyeOff className="h-6 w-6 opacity-50" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end mb-4">
                      <a
                        href="/forgotpassword"
                        className="text-sm underline text-black font-bold"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <DialogFooter>
                      <button
                        disabled={loadingSub}
                        type="submit"
                        className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
                      >
                        {loadingSub ? 'Signing in...' : 'Sign In'}
                      </button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        ) : null}

        <div className="bg-red-600 ">
          {showBook && (
            <SuccessModal
              loading={''}
              successMessage={formSucess}
              handleClick={() => {
                setshowBook(false);
                router.push('/');
              }}
            />
          )}
        </div>

        <div className="text-xs mt-2 mb-2  align-center justify-center ">
          No money charged in this step
        </div>
      </div>
    </div>
  );
};

export default Appointment;
