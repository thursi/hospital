'use client';
import { signOut } from '@/api/route';
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
import { changePassword } from './action';

const formSchema = z.object({
  oldPassword: z.string({ required_error: 'Please enter your password!' }),
  newPassword: z.string({ required_error: 'Please enter your password!' }),
});

const ChangePassword = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: undefined,
      newPassword: undefined,
    },
  });

  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const response = await changePassword({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    });
    console.log(response);
    if (response.success) {
      toast.success(response?.message);
      await signOut();
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
    email: '',
    password: '',
    // confirmPassword: '',
  });

  const backgroundImageStyle = {
    backgroundImage: 'url(/auth.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleOldPasswordVisibility = () => {
    setShowOldPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">
          Reset Your Password : Forgot Password?
        </h2>
        <p className="text-center mb-6">
          Please enter the OTP and your new password to reset your password.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showOldPassword ? 'text' : 'password'}
                        placeholder="password.."
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={toggleOldPasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm"
                      >
                        {showOldPassword ? (
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

            {/* 
                  <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Old Password</FormLabel>
                        <FormControl>
                          <Input placeholder="Old Password.." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
            {/* 
<FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input placeholder="New Password.." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
 */}

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
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
            <div className="mt-5 ">
              <button
                disabled={loading}
                type="submit"
                className="py-2 px-8 bg-black text-white rounded cursor-pointer hover:scale-105"
              >
                Change Password
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
