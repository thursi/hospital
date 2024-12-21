'use client';
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
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Eye, EyeOff } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { registerUser } from './action';

const formSchema = z.object({
  firstName: z.string({ required_error: 'Please enter your first name!' }),
  password: z.string({ required_error: 'Please enter your password!' }),
  lastName: z.string({ required_error: 'Please enter your last name!' }),
  email: z
    .string({ required_error: 'Please enter your email!' })
    .email('Please enter a valid email!'),
  phoneNo: z
    .string({ required_error: 'Phone number is required!' })
    .regex(
      /^[0]{1}[7]{1}[01245678]{1}[0-9]{7}$/,
      'Please enter a valid phone number'
    ),
  dateOfBirth: z.date({ required_error: 'Please Select the date of birth!' }),
  gender: z.string({ required_error: 'Gender is required!' }),
  role: z.string({ required_error: '' }),
});

const SignUp = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: undefined,
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      phoneNo: undefined,
      dateOfBirth: undefined,
      gender: undefined,
      role: 'USER',
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    registerUser({
      ...values,
      dateOfBirth: moment(values.dateOfBirth)
        .format('YYYY-MM-DD')
        .replace('-', '.'),
    }).then((res: any) => {
      if (res.success) {
        toast.success(res.message, {
          onDismiss: () => router.push('/auth?mode=signin'),
        });
      } else {
        toast.error(res.message);
        form.reset();
      }
    });
  }
  const [userInfo, setUserInfo] = useState({
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    dateOfBirth: '',
    gender: '',
  });

  const backgroundImageStyle = {
    backgroundImage: 'url(/auth.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setUserInfo((currInfo) => {
      return {
        ...currInfo,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // try {
    const response = await registerUser({
      password: userInfo.password,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      phoneNo: userInfo.phoneNo,
      dateOfBirth: userInfo.dateOfBirth,
      gender: userInfo.gender,
      role: 'USER',
    });
    console.log(response, '12121212121');
    alert(response?.message);
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <main className="h-screen">
      <header className="w-full h-full">
        <section className="w-full h-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
            <div
              className="col-span-1 lg:col-span-2 bg-blue-500 flex items-center justify-center p-10"
              style={backgroundImageStyle}
            ></div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="bg-white flex flex-col gap-4 md:px-5 pl-10 pr-20">
                  <Image
                    src="/stubby.png"
                    alt="Company Logo"
                    width={217}
                    height={72}
                    className="mt-20 mb-5"
                  />

                  <div className=" rounded inline-block ">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="First Name.." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className=" rounded inline-block ">
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Last Name.." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className=" rounded inline-block ">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Email.." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="rounded inline-block">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="password.."
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm"
                              >
                                {showPassword ? (
                                  <Eye className="ml-auto h-6 w-6 opacity-50" />
                                ) : (
                                  <EyeOff className="ml-auto h-6 w-6 opacity-50" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className=" rounded inline-block ">
                    <FormField
                      control={form.control}
                      name="phoneNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone number</FormLabel>
                          <FormControl>
                            <Input
                              onInput={(e) => {
                                if (e.target instanceof HTMLInputElement) {
                                  e.target.value = e.target.value.replace(
                                    /[^0-9+]/g,
                                    ''
                                  );
                                }
                              }}
                              placeholder="Phone number.."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className=" rounded inline-block ">
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <Popover>
                            <PopoverTrigger className="w-full" asChild>
                              <FormControl>
                                <Button
                                  variant={'outline'}
                                  className={cn(
                                    'w-full pl-3 text-left font-normal',
                                    !field.value && 'text-muted-foreground'
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, 'PPP')
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date('1900-01-01')
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className=" rounded inline-block ">
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem className="flex flex-col w-full">
                          <FormLabel>Gender</FormLabel>
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
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="py-2 px-8 bg-purple-600 text-white border-none rounded text-xm cursor-pointer hover:scale-100"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </section>
      </header>
    </main>
  );
};

export default SignUp;
