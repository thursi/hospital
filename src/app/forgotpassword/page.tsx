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
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { forgotPassword, resetPassword } from './action';

const formSchema = z.object({
  email: z
    .string({ required_error: 'Please enter your email!' })
    .email('Please enter a valid email!'),
});

const resetPassFormSchema = z.object({
  otp: z.string({ required_error: 'Please enter your OTP!' }),
  password: z.string({ required_error: 'Please enter your new password!' }),
});

const ForgotPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [resetPass, setResetPassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>(''); // State for OTP
  const [password, setPassword] = useState<string>(''); // State for Password
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmitForgotPassword(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const response = await forgotPassword(values.email);
    if (response.success) {
      toast.success(response.message);
      setResetPassword(true);
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  }

  const resetPassForm = useForm<z.infer<typeof resetPassFormSchema>>({
    resolver: zodResolver(resetPassFormSchema),
    defaultValues: {
      otp: '',
      password: '',
    },
  });

  async function onSubmitResetPassword() {
    setLoading(true);
    const response = await resetPassword({
      otp,
      password,
    });

    if (response.success) {
      toast.success(response.message);
      await router.push('/auth?mode=signin');
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">
          {resetPass ? 'Reset Your Password' : 'Forgot Password?'}
        </h2>
        <p className="text-center mb-6">
          {resetPass
            ? 'Please enter the OTP and your new password to reset your password.'
            : 'Enter your email to receive a password reset link.'}
        </p>

        {resetPass ? (
          <Form {...resetPassForm}>
            <form onSubmit={(e) => { e.preventDefault(); onSubmitResetPassword(); }}>
              <div className="flex flex-col gap-4">
                <FormField
                  control={resetPassForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OTP</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter OTP..."
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)} // Update OTP state
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={resetPassForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="New Password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Update password state
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
                <button
                  disabled={loading}
                  type="submit"
                  className="py-2 px-8 bg-black text-white border-none rounded text-xm cursor-pointer hover:scale-100"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </Form>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitForgotPassword)}>
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Email Address..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <button
                  disabled={loading}
                  type="submit"
                  className="py-2 px-8 bg-black text-white rounded cursor-pointer hover:scale-105"
                >
                  Submit
                </button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
