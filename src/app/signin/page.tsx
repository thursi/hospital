'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/authStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { loginUser } from './action';

const formSchema = z.object({
  email: z
    .string({ required_error: 'Please enter your email!' })
    .email('Please enter a valid email!'),
  password: z.string({ required_error: 'Please enter your password!' }),
});

const SignUp = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: undefined,
      password: undefined,
    },
  });

  const [setLogin] = useAuthStore((state) => [state.setLogin]);

  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
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
  }
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    // name: '',
    email: '',
    password: '',
    // confirmPassword: '',
  });

  const backgroundImageStyle = {
    backgroundImage: 'url(/auth.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserInfo((currInfo) => ({
      ...currInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (userInfo.password !== userInfo.confirmPassword) {
    //   alert('Passwords do not match!');
    //   return;
    // }

    try {
      const response = await loginUser({
        email: userInfo.email,
        password: userInfo.password,
      });

      console.log('User Info Submitted:', response);

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
        });
      } else {
        toast.error(response.message);
      }
      // Redirect to dashboard after successful registration
      // router.push('/dashboard');
    } catch (error) {
      toast.error('Oops! Something went wrong. Try again.');
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
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
                <div className="bg-white flex flex-col pl-20 pr-20 gap-2">
                  <Image
                    src="/stubby.png"
                    alt="Company Logo"
                    width={217}
                    height={72}
                    className="mt-20 mb-5"
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Email Adress.." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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


                  <div className="flex justify-end mb-4">
                    <Link
                      href="/forgotpassword"
                      style={{
                        fontSize: '0.875rem',
                        color: '#000',
                        textDecoration: 'underline',
                        fontFamily: 'Inter-Bold',
                      }}
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div>
                    <button
                      disabled={loading}
                      type="submit"
                      className="py-2 px-8 bg-purple-600 text-white border-none rounded text-xm cursor-pointer hover:scale-100"
                    >
                      Sign In
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
