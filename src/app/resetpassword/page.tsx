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
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { resetPassword } from './action';

const formSchema = z.object({
  otp: z.string({ required_error: 'Please enter your otp!' }),
  password: z.string({ required_error: 'Please enter your password!' }),
});

const ResetPassword = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: undefined,
      password: undefined,
    },
  });

  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('objectthussivalues', values);
    setLoading(true);
    const response = await resetPassword({
      otp: values.otp,
      password: values.password,
    });
    console.log('resetPasswordresetPasswordresetPassword', response);
    if (response?.success) {
      console.log('object');
      toast.success(response.message);
      await router.push('/auth?mode=signin');
      setLoading(false);
    } else {
      toast.error(response.message);
      setLoading(false);
    }
  }
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    // name: '',
    otp: '',
    password: '',
    // confirmPassword: '',
  });

  const backgroundImageStyle = {
    backgroundImage: 'url(/auth.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
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
              className="col-span-1 lg:col-span-2 bg-blue-500  text-white flex items-center justify-center p-10"
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
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OTP</FormLabel>
                        <FormControl>
                          <Input placeholder="Otp.." {...field} />
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

                  <div>
                    <button
                      disabled={loading}
                      type="submit"
                      className="py-2 px-8 bg-black-600 text-white border-none rounded text-xm cursor-pointer hover:scale-100"
                    >
                      Reset Password
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

export default ResetPassword;
