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
import { useAuthStore } from '@/store/authStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, Eye, EyeOff } from 'lucide-react';
import moment from 'moment';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { loginUser, registerUser } from './action';

const formSchema = z.object({
  email: z
    .string({ required_error: 'Please enter your email!' })
    .email('Please enter a valid email!'),
  password: z.string({ required_error: 'Please enter your password!' }),
});

const signUpFormSchema = z.object({
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
  role: z.string().default('USER'),
});

const AuthScreens = () => {
  const searchParams = useSearchParams(); // Get URL search params
  const mode = searchParams.get('mode'); // Retrieve the 'mode' query param

  const [isSignUpMode, setIsSignUpMode] = useState(mode === 'signup');

  const signInForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [setLogin] = useAuthStore((state) => [state.setLogin]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
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

  const onSubmit = (values: z.infer<typeof signUpFormSchema>) => {
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
        signUpForm.reset();
      }
    });
  };

  const handleSignIn = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const response = await loginUser({
      email: values.email,
      password: values.password,
    });
    console.log(response);
    if (response.success) {
      setLogin(response);
      toast.success(response.message, {
        onDismiss: () => {
          if (response.role === 'ADMIN') {
            router.push('/admin/dashboard');
            return;
          }
          router.push('/');
        },
        onAutoClose: () => {
          if (response.role === 'ADMIN') {
            router.push('/admin/dashboard');
            return;
          }
          router.push('/');
        },
      });
      setLoading(false);
    } else {
      toast.error(response.message);
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gray-50 overflow-hidden">
   
      {/* <div className="absolute inset-0 overflow-hidden z-0">
        <div className="relative h-full w-full">
          <video
            autoPlay
            loop
            muted
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectFit: 'cover' }}
          >
            <source src="/Logvideo.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
      </div> */}

      <div className="relative z-10 bg-white p-8 rounded-lg shadow-md w-100 h-auto">
        <div className="flex justify-between mb-6 gap-x-4">
          <button
            className={`text-lg font-bold border p-2  ${
              !isSignUpMode ? 'w-40' : 'w-60'
            } h-10 rounded-lg ${
              !isSignUpMode ? 'bg-blue-400' : 'bg-transparent'
            }`}
            onClick={() => setIsSignUpMode(false)}
          >
            Sign In
          </button>
          <button
            className={`text-lg font-bold border p-2 w-40 h-10 rounded-lg ${
              !isSignUpMode ? 'w-40' : 'w-60'
            } ${isSignUpMode ? 'bg-blue-400' : 'bg-transparent'}`}
            onClick={() => setIsSignUpMode(true)}
          >
            Sign Up
          </button>
        </div>

        <div className="mb-6">
          {isSignUpMode ? (
            <div>
              <h2 className="text-xl font-bold">Are you a new user?</h2>
              <p>Sign up for an account for a faster checkout.</p>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold">Sign in to your account</h2>
              <p>Login to your account for a faster checkout.</p>
            </div>
          )}
        </div>

        {!isSignUpMode ? (
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
              <button
                disabled={loading}
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </Form>
        ) : (
          <Form {...signUpForm}>
            <form onSubmit={signUpForm.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <FormField
                  control={signUpForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signUpForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <FormField
                  control={signUpForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signUpForm.control}
                  name="phoneNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
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
                          placeholder="Phone Number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <FormField
                  control={signUpForm.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              {field.value ? (
                                moment(field.value).format('MMMM DD, YYYY')
                              ) : (
                                <span>Date of Birth</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date('1900-01-01')
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signUpForm.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full bg-white border border-gray-300 rounded-lg py-2 px-4"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={signUpForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="submit"
                className="w-full bg-black text-white py-2 mt-5 px-4 rounded-lg hover:bg-gray-800"
              >
                Sign Up
              </button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};

export default AuthScreens;
