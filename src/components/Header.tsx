// "use client";
// import { signOut } from "@/api/route";
// import {
//   getDepartmentData,
//   getDoctorData,
//   getMedicinesData,
//   getPetData,
// } from "@/app/home/action";
// import SideBarIcon from "@/components/svg/side_bar_icon";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { useAuthStore } from "@/store/authStore";
// import { useDepartmentStore } from "@/store/departmentStore";
// import { useDoctorStore } from "@/store/doctorStore";
// import { useMedicineStore } from "@/store/medicinesStore";
// import { usePetStore } from "@/store/petStore";
// import Image from "next/image";
// import { usePathname, useRouter } from "next/navigation";
// import { useCallback, useEffect, useState } from "react";
// import Logoeffect from "../../public/stubby.png";

// export default function Home() {
//   const pathName = usePathname();
//   const [doctors, setAllDoctors] = useDoctorStore((state: any) => [
//     state.doctors,
//     state.setAllDoctors,
//   ]);
//   const [departments, setAllDepartments] = useDepartmentStore((state: any) => [
//     state.departments,
//     state.setAllDepartments,
//   ]);
//   const [pets, setAllPets] = usePetStore((state: any) => [
//     state.pets,
//     state.setAllPets,
//   ]);
//   const [medicines, setAllMedicines] = useMedicineStore((state: any) => [
//     state.medicines,
//     state.setAllMedicines,
//   ]);
//   const [login, setLogin] = useAuthStore((state) => [
//     state.login,
//     state.setLogin,
//   ]);

//   const fetchData = useCallback(async () => {
//     try {
//       const petData = await getPetData();
//       const departmentData = await getDepartmentData();
//       const doctorData = await getDoctorData();
//       const medicinesData = await getMedicinesData();
//       setAllDepartments(departmentData);
//       setAllMedicines(medicinesData);
//       setAllPets(petData);
//       setAllDoctors(doctorData);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }, [setAllDepartments, setAllMedicines, setAllPets, setAllDoctors]);
  

//   const handleButtonClick = () => {
//     console.log("Search button clicked");
//   };

//   const doctores = Array.isArray(doctors)
//     ? doctors.map((doctor: any) => ({
//         src: doctor.preSignedUrl,
//         alt: doctor.image,
//         textOverlay: doctor.name,
//       }))
//     : [];

//   const [open, setOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

//   const router = useRouter();

//   const handleMouseEnter = useCallback(
//     (view: string) => setActiveDropdown(view),
//     []
//   );
//   const handleMouseLeave = useCallback(() => setActiveDropdown(null), []);

//   const handleSignout = async () => {
//     await signOut();
//     setLogin(undefined);
//   };

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const renderDropdown = (items: any[], hrefBase: string) => (
//     <div className="absolute bg-white shadow-md mt-2 w-48">
//       <hr className="my-2" />
//       <ul className="flex flex-col space-y-2">
//         {items &&
//           Array.isArray(items) &&
//           items.map(
//             (item, index) =>
//               item && (
//                 <li key={index}>
//                   <a
//                     href={`${hrefBase}/${item.id}`}
//                     className="text-gray-600 block px-4 py-2"
//                   >
//                     {item.name}
//                     <hr className="mt-2" />
//                   </a>
//                 </li>
//               )
//           )}
//       </ul>
//     </div>
//   );

//   return (
//     <header className={`fixed top-0 left-0 w-full z-10 transition-all duration-300 bg-white bg-opacity-90`}>
//       <div className={`w-full h-fit flex flex-col md:flex-row justify-between items-center px-8 py-2 text-black`}>
//         <div className="flex justify-between items-center w-full md:hidden">
//           <a href="/">
//             <Image src={Logoeffect} alt="Company Logo" className="w-36" />
//           </a>
//           <Sheet open={open} onOpenChange={setOpen}>
//             <SheetTrigger className="px-3">
//               <SideBarIcon />
//             </SheetTrigger>
//             <SheetContent className={`h-full flex flex-col items-start text-black`}>
//               <Image src={Logoeffect} className="w-[288px]" alt="Company Logo" />
//               <ul className="flex flex-col space-y-4 text-black">
//                 <li key={0}>
//                   <a href="/" className="hover:text-red-500">Home</a>
//                 </li>
//                 <li key={1}>
//                   <a href="/aboutus" className="hover:text-red-500">About Us</a>
//                 </li>
//                 {login && (
//                   <li key={2}>
//                     <a href="/Appointments" className="hover:text-red-500">Appointments</a>
//                   </li>
//                 )}
//                 <li onClick={() => handleMouseEnter("departments")} className="hover:text-red-500 relative">
//                   <a href="/departments" className="hover:text-red-500">Departments</a>
//                   {activeDropdown === "departments" && renderDropdown(departments, "/departments")}
//                 </li>
//                 <li onClick={() => handleMouseEnter("doctors")} className="hover:text-red-500 relative">
//                   <a href="/doctors" className="hover:text-red-500">Doctors</a>
//                   {activeDropdown === "doctors" && renderDropdown(doctors, "/doctor-details")}
//                 </li>
//                 <li onClick={() => handleMouseEnter("medicines")} className="hover:text-red-500 relative">
//                   <a href="/medicines" className="hover:text-red-500">Medicines</a>
//                   {activeDropdown === "medicines" && renderDropdown(medicines, "/medicines")}
//                 </li>
//                 <li onClick={() => handleMouseEnter("pets")} className="hover:text-red-500 relative">
//                   <a href="/pets" className="hover:text-red-500">Pets</a>
//                   {activeDropdown === "pets" && renderDropdown(pets, "/pets")}
//                 </li>
//                 {login ? (
//                   <div onClick={handleSignout} className="bg-red-500 hover:bg-yellow-500 text-white px-4 py-1 rounded">
//                     <p className="hover:text-black">SignOut</p>
//                   </div>
//                 ) : (
//                   <>
//                     <li className="bg-red-500 hover:bg-yellow-500 text-white px-4 py-1 rounded">
//                       <a href="/auth?mode=signin" className="hover:text-black">Sign In</a>
//                     </li>
//                     <li className="bg-red-500 hover:bg-yellow-500 text-white px-4 py-1 rounded">
//                       <a href="/auth?mode=signup" className="hover:text-black">Sign Up</a>
//                     </li>
//                   </>
//                 )}
//               </ul>
//             </SheetContent>
//           </Sheet>
//         </div>
//         <div className="hidden md:flex md:items-center w-full text-black">
//           <a href="/">
//             <Image src={Logoeffect} alt="Company Logo" className="w-36" />
//           </a>
//           <nav className="flex-1 flex justify-center">
//             <ul className="flex space-x-8 text-black">
//               <li key={0}>
//                 <a href="/" className="hover:text-red-500">Home</a>
//               </li>
//               <li key={1}>
//                 <a href="/aboutus" className="hover:text-red-500">About Us</a>
//               </li>
//               {login && (
//                 <li key={2}>
//                   <a href="/Appointments" className="hover:text-red-500">Appointments</a>
//                 </li>
//               )}
//               <li onMouseEnter={() => handleMouseEnter("departments")} onMouseLeave={handleMouseLeave} className="relative">
//                 <a href="/departments" className="hover:text-red-500">Departments</a>
//                 {activeDropdown === "departments" && renderDropdown(departments, "/departments")}
//               </li>
//               <li onMouseEnter={() => handleMouseEnter("doctors")} onMouseLeave={handleMouseLeave} className="relative">
//                 <a href="/doctors" className="hover:text-red-500">Doctors</a>
//                 {activeDropdown === "doctors" && renderDropdown(doctors, "/doctor-details")}
//               </li>
//               <li onMouseEnter={() => handleMouseEnter("medicines")} onMouseLeave={handleMouseLeave} className="relative">
//                 <a href="/medicines" className="hover:text-red-500">Medicines</a>
//                 {activeDropdown === "medicines" && renderDropdown(medicines, "/medicines")}
//               </li>
//               <li onMouseEnter={() => handleMouseEnter("pets")} onMouseLeave={handleMouseLeave} className="relative">
//                 <a href="/pets" className="hover:text-red-500">Pets</a>
//                 {activeDropdown === "pets" && renderDropdown(pets, "/pets")}
//               </li>
//                           </ul>
//           </nav>
//           <div className="flex space-x-4">
//             {login ? (
//               <button
//               onClick={handleSignout}
              
//                 className="bg-red-500 hover:bg-yellow-500 text-white px-4 py-1 rounded"
//               >
//                 Signout
//               </button>
//             ) : (
//               <>
//                 <button
//                   onClick={handleButtonClick}
//                   className="bg-red-500 hover:bg-yellow-500 text-white px-4 py-1 rounded"
//                 >
//                   <a href="/auth?mode=signin">Sign In</a>
//                 </button>
//                 <button
//                   onClick={handleButtonClick}
//                   className="bg-red-500 hover:bg-yellow-500 text-white px-4 py-1 rounded"
//                 >
//                   {/* <a href="/auth">Sign Up</a>
//                    */}

//                   <a href="/auth?mode=signup">Sign Up</a>
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }


'use client';
import { signOut } from '@/api/route';
import {
  getDepartmentData,
  getDoctorData,
  getMedicinesData,
  getPetData,
} from '@/app/home/action';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
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
import SideBarIcon from '@/components/svg/side_bar_icon';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuthStore } from '@/store/authStore';
import { useDepartmentStore } from '@/store/departmentStore';
import { useDoctorStore } from '@/store/doctorStore';
import { useMedicineStore } from '@/store/medicinesStore';
import { usePetStore } from '@/store/petStore';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import Logoeffect from '../../public/stubby.png';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { loginUser, registerUser } from '@/app/auth/action';
import { Calendar } from '@/components/ui/calendar';
import {
  ArrowRight,
  CalendarIcon,
  Eye,
  EyeOff,
  LogOut,
  User,
} from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { forgotPassword, resetPassword } from '@/app/forgotpassword/action';
import moment from 'moment';
import { Button } from './ui/button';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const signInFormSchema = z.object({
  email: z
    .string({ required_error: 'Please enter your email!' })
    .email('Please enter a valid email!'),
  password: z.string({ required_error: 'Please enter your password!' }),
});

const resetPassFormSchema = z.object({
  otp: z.string({ required_error: 'Please enter your OTP!' }),
  password: z.string({ required_error: 'Please enter your new password!' }),
});

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
  // cityId: z.number({ required_error: '' }),
});

export default function Home() {
  const pathName = usePathname();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loadingSub, setLoadingSub] = useState(false);
  const [isForgotpasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [resetPass, setResetPassword] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const router = useRouter();
  const [calendarOpen, setCalendarOpen] = useState(true);

  const [doctors, setAllDoctors] = useDoctorStore((state: any) => [
    state.doctors,
    state.setAllDoctors,
  ]);
  const [departments, setAllDepartments] = useDepartmentStore((state: any) => [
    state.departments,
    state.setAllDepartments,
  ]);
  const [pets, setAllPets] = usePetStore((state: any) => [
    state.pets,
    state.setAllPets,
  ]);
  const [medicines, setAllMedicines] = useMedicineStore((state: any) => [
    state.medicines,
    state.setAllMedicines,
  ]);
  const [login, setLogin, loadingAuth] = useAuthStore((state) => [
    state.login,
    state.setLogin,
    state.loadingAuth,
  ]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const petData = await getPetData();
      const departmentData = await getDepartmentData();
      const doctorData = await getDoctorData();
      const medicinesData = await getMedicinesData();
      setAllPets(petData);

      setAllDepartments(departmentData);
      setAllDoctors(doctorData);

      setAllMedicines(medicinesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const doctores = Array.isArray(doctors)
    ? doctors.map((doctor: any) => ({
        src: doctor.preSignedUrl,
        alt: doctor.image,
        textOverlay: doctor.name,
      }))
    : [];

  const handleMouseEnter = useCallback(
    (view: string) => setActiveDropdown(view),
    []
  );
  const handleMouseLeave = useCallback(() => setActiveDropdown(null), []);

  const signInForm = useForm({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSignIn = async (data: any) => {
    setLoadingSub(true);

    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });

      if (response.success) {
        setLogin(response);
        toast.success(response.message);
        setIsDialogOpen(false);
        const targetPath = response.role === 'ADMIN' ? '/admin/dashboard' : '/';
        router.push(targetPath);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Oops! Something went wrong. Try again.');
      console.error('Sign-in failed:', error);
    } finally {
      setLoadingSub(false);
    }
  };

  const handleSignout = async () => {
    await signOut();
    setLogin(undefined);
    router.push('/');
    window.location.reload();
  };

  // useEffect(() => {
  //   if (login?.role === 'ADMIN') {
  //     router.push('/admin/dashboard');
  //   } else if (login?.role === 'USER') {
  //     router.push('/');
  //   }else
  //   {
  //     router.push('/');

  //   }
  // }, [login?.role]);

  const renderDropdown = (items: any[], hrefBase: string) => (
    <div className="absolute bg-white shadow-md mt-2 w-48">
      <hr className="my-2" />
      <ul className="flex flex-col space-y-2">
        {items &&
          Array.isArray(items) &&
          items.map(
            (item, index) =>
              item && (
                <li key={index}>
                  <a
                    href={`${hrefBase}/${item.id}`}
                    className="text-gray-600 block px-4 py-2"
                  >
                    {item.name}
                    <hr className="mt-2" />
                  </a>
                </li>
              )
          )}
      </ul>
    </div>
  );

  const forgetPassformSchema = z.object({
    email: z
      .string({ required_error: 'Please enter your email!' })
      .email('Please enter a valid email!'),
  });

  const form = useForm<z.infer<typeof forgetPassformSchema>>({
    resolver: zodResolver(forgetPassformSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmitForgotPassword(
    values: z.infer<typeof forgetPassformSchema>
  ) {
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
      setIsForgotPasswordOpen(false);
      setIsDialogOpen(true);
      window.location.reload();

      // await router.push('/auth?mode=signin');
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  }

  // const signupForm = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     password: undefined,
  //     firstName: undefined,
  //     lastName: undefined,
  //     email: undefined,
  //     phoneNo: undefined,
  //     dateOfBirth: undefined,
  //     gender: undefined,
  //     role: 'USER',
  //     cityId: 1
  //   },
  // });
  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   console.log("valuesvaluesvalues",values)
  //   registerUser({
  //     ...values,
  //     // dateOfBirth: moment(values.dateOfBirth)
  //       // .format('YYYY-MM-DD')
  //       // .replace('-', '.'),
  //   }) .then((res: any) => {
  //     if (res.success===true) {
  //       toast.success(res.message);
  //       setIsForgotPasswordOpen(false);
  //       setIsSignupOpen(false);
  //       setIsDialogOpen(true);
  //     } else {
  //       toast.error(res.message);
  //       form.reset();
  //     }
  //   });
  // }

  const signupForm = useForm<z.infer<typeof formSchema>>({
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
      // cityId: 1,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Format dateOfBirth if needed (you can re-enable the code if necessary)
    const formattedValues: any = {
      ...values,
      // dateOfBirth: values.dateOfBirth
      //   ? moment(values.dateOfBirth).format('YYYY-MM-DD')
      //   : undefined,
    };

    try {
      const response: any = await registerUser(formattedValues);
      if (response.success === 'true') {
        toast.success(response.message);
        setIsSignupOpen(false);
        setIsDialogOpen(true);
        setIsForgotPasswordOpen(false);
      } else {
        toast.error(response.message);
        signupForm.reset();
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('An error occurred. Please try again.');
    }
  }

  if (loadingAuth) {
    <div>Loading...!</div>;
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-10 transition-all duration-300 bg-white bg-opacity-90`}
    >
      <div
        className={`w-full h-fit flex flex-col md:flex-row justify-between items-center px-8 py-2 text-black`}
      >
        <div className="flex justify-between items-center w-full md:hidden">
          <a href="/">
            <Image src={Logoeffect} alt="Company Logo" className="w-36" />
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="px-3">
              <SideBarIcon />
            </SheetTrigger>
            <SheetContent
              className={`h-full flex flex-col items-start text-black`}
            >
              <Image
                src={Logoeffect}
                className="w-[288px]"
                alt="Company Logo"
              />

              <ul className="flex flex-col  space-y-4 text-black">
                <li key={0}>
                  <a href="/" className="hover:text-red-500">
                    Home
                  </a>
                </li>
                <li key={1}>
                  <a href="/aboutus" className="hover:text-red-500">
                    About Us
                  </a>
                </li>
                {login && (
                  <li key={2}>
                    <a href="/Appointments" className="hover:text-red-500">
                      Appointments
                    </a>
                  </li>
                )}

                {/* <li key={3}>
                  <a href="/viewallhospi" className="hover:text-red-500">
                    Hospitals
                  </a>
                </li> */}
                
                <li key={4}>
                  <a href="/viewalldoctors" className="hover:text-red-500">
                  Doctors
                  </a>
                </li>

                {/* <li
                  onClick={() => handleMouseEnter('viewallhospi')}
                  className="hover:text-red-500 relative"
                >
                  <a href="/viewallhospi" className="hover:text-red-500">
                    Hospitals
                  </a>
                  {activeDropdown === 'viewallhospi' &&
                    renderDropdown(departments, '/viewallhospi')}
                </li> */}

                {/* 

                <li
                  onClick={() => handleMouseEnter('doctors')}
                  className="hover:text-red-500 relative"
                >
                  <a href="/doctors" className="hover:text-red-500">
                    Doctors
                  </a>
                  {activeDropdown === 'doctors' &&
                    renderDropdown(doctors, '/doctor-details')}
                </li>
                <li
                  onClick={() => handleMouseEnter('medicines')}
                  className="hover:text-red-500 relative"
                >
                  <a href="/medicines" className="hover:text-red-500">
                    Medicines
                  </a>
                  {activeDropdown === 'medicines' &&
                    renderDropdown(medicines, '/medicines')}
                </li>
                <li
                  onClick={() => handleMouseEnter('pets')}
                  className="hover:text-red-500 relative"
                >
                  <a href="/pets" className="hover:text-red-500">
                    Pets
                  </a>
                  {activeDropdown === 'pets' && renderDropdown(pets, '/pets')}
                </li>

 */}

                {login ? (
                  <div className="bg-red-500 hover:bg-yellow-500 text-white px-4 py-1 rounded">
                    {/* <p className="hover:text-black">SignOut</p> */}

                    <button className="flex items-center gap-2 cursor-pointer">
                      <LogOut size={30} />
                      <span className="text-sm lg:text-lg font-semibold">
                        SIGN OUT
                      </span>
                    </button>
                  </div>
                ) : (
                  <>
                    <li className="bg-red-500 hover:bg-yellow-500 text-white px-4 py-1 rounded">
                      <a href="/auth?mode=signin" className="hover:text-black">
                        Sign In
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden md:flex md:items-center w-full text-black">
          <a href="/">
            <Image src={Logoeffect} alt="Company Logo" className="w-36" />
          </a>
          <nav className="flex-1 flex justify-center">
            <ul className="flex space-x-8 text-black">
              <li key={0}>
                <a href="/" className="hover:text-red-500">
                  Home
                </a>
              </li>
              <li key={1}>
                <a href="/aboutus" className="hover:text-red-500">
                  About Us
                </a>
              </li>
              {login && (
                <li key={2}>
                  <a href="/Appointments" className="hover:text-red-500">
                    Appointments
                  </a>
                </li>
              )}

              {/* <li >
                <a href="/viewallhospi" className="hover:text-red-500">
                  Hospitals
                </a>
              </li> */}
              <li >
                  <a href="/viewalldoctors" className="hover:text-red-500">
                  Doctors
                  </a>
                </li>

              {/* <li
                onMouseEnter={() => handleMouseEnter('departments')}
                onMouseLeave={handleMouseLeave}
                className="relative"
              >
                <a href="/departments" className="hover:text-red-500">
                  Hospitals
                </a>
                {activeDropdown === 'departments' &&
                  renderDropdown(departments, '/departments')}
              </li> */}

              {/* <li
                onMouseEnter={() => handleMouseEnter('doctors')}
                onMouseLeave={handleMouseLeave}
                className="relative"
              >
                <a href="/doctors" className="hover:text-red-500">
                  Doctors
                </a>
                {activeDropdown === 'doctors' &&
                  renderDropdown(doctors, '/doctor-details')}
              </li>


              <li
                onMouseEnter={() => handleMouseEnter('medicines')}
                onMouseLeave={handleMouseLeave}
                className="relative"
              >
                <a href="/medicines" className="hover:text-red-500">
                  Medicines
                </a>
                {activeDropdown === 'medicines' &&
                  renderDropdown(medicines, '/medicines')}
              </li>



              <li
                onMouseEnter={() => handleMouseEnter('pets')}
                onMouseLeave={handleMouseLeave}
                className="relative"
              >
                <a href="/pets" className="hover:text-red-500">
                  Pets
                </a>
                {activeDropdown === 'pets' && renderDropdown(pets, '/pets')}
              </li> */}
            </ul>
          </nav>

          {login ? (
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-end justify-end text-right gap-2">
                <User size={30} />
                <span className="text-sm lg:text-lg font-semibold">
                  {login ? `${login?.firstName}` : ' '}
                </span>
              </div>
              <div
                onClick={handleSignout}
                className="text-black justify-end items-end text-right py-1 rounded"
              >
                <button className="flex items-center gap-2 group bg-[#4CB847] hover:bg-[#3A9236] text-white font-medium py-2 px-4 rounded-md transition-colors">
                  <LogOut size={30} />
                  <span className="flex items-center text-sm lg:text-lg font-semibold">
                    LOG OUT
                    <ArrowRight
                      className="ml-2 w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 text-white transition-all duration-200"
                      size={20}
                    />
                  </span>
                </button>

                {/* <button className="flex  gap-2 cursor-pointer  justify-end items-end text-right">
                  <LogOut size={30} />
                  <span className="text-sm lg:text-lg font-semibold">
                    LOG OUT
                  </span>
                </button> */}
              </div>
            </div>
          ) : (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <div
                  //  className=" hover:bg-yellow-500 text-black px-4 py-1 rounded">
                  className="  px-4 py-1 rounded"
                >
                  {/* <p className="hover:text-black">Sign In</p> */}
                  <button className="flex items-center gap-2 group bg-[#4CB847] hover:bg-[#3A9236] text-white font-medium py-2 px-4 rounded-md transition-colors">
                    <User size={30} />
                    <span className="flex items-center text-sm lg:text-lg font-semibold">
                      LOGIN
                      <ArrowRight
                        className="ml-2 w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 text-white transition-all duration-200"
                        size={20}
                      />
                    </span>
                  </button>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sign In</DialogTitle>
                  <DialogDescription>
                    Enter your credentials to sign in.
                  </DialogDescription>
                </DialogHeader>
                <Form {...signInForm}>
                  <form onSubmit={signInForm.handleSubmit(handleSignIn)}>
                    <div className="py-3">
                      <FormField
                        control={signInForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-black">
                              Email
                            </FormLabel>
                            <FormControl className="focus:outline-none focus:ring-0 ">
                              <Input
                                className="w-full px-2 mt-2 py-2 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 "
                                placeholder="Enter email"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="py-3">
                      <FormField
                        control={signInForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-black">
                              Password
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type={showPassword ? 'text' : 'password'}
                                  placeholder="Enter password"
                                  {...field}
                                />
                                <button
                                  type="button"
                                  onClick={togglePasswordVisibility}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                  {showPassword ? <EyeOff /> : <Eye />}
                                </button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="pt-2">
                      Need an account? {''}
                      <button
                        type="button"
                        onClick={() => {
                          setIsForgotPasswordOpen(false),
                            setIsDialogOpen(false),
                            setIsSignupOpen(true);
                        }}
                        className="text-sm underline text-black font-bold"
                      >
                        {' Create One'}
                      </button>
                    </div>
                    <div className="flex justify-end mb-4">
                      <button
                        type="button"
                        onClick={() => {
                          setIsForgotPasswordOpen(true);
                          setIsDialogOpen(false);
                        }}
                        className="text-sm underline text-black font-bold"
                      >
                        {'Forgot password?'}
                      </button>
                    </div>
                    <DialogFooter>
                      <button
                        disabled={loadingSub}
                        type="submit"
                        // className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
                        className="flex w-full items-center justify-center group bg-[#4CB847] hover:bg-[#3A9236] text-white font-medium py-2 px-4 rounded-md transition-colors"
                      >
                        {loadingSub ? 'Signing in...' : 'Sign In'}
                        <ArrowRight
                          className="ml-2 w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 text-white transition-all duration-200"
                          size={20}
                        />
                      </button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          )}

          <Dialog
            open={isForgotpasswordOpen}
            onOpenChange={setIsForgotPasswordOpen}
          >
            <DialogTrigger>
              <div className="hidden"></div>{' '}
              {/* DialogTrigger is handled directly with button click */}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {resetPass ? 'Reset Your Password' : 'Forgot Password'}
                </DialogTitle>
                <DialogDescription>
                  {resetPass
                    ? 'Please enter the OTP and your new password to reset your password.'
                    : 'Enter your email to receive a password reset link.'}
                </DialogDescription>
              </DialogHeader>

              {resetPass ? (
                <Form {...resetPassForm}>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      onSubmitResetPassword();
                    }}
                  >
                    <div className="flex flex-col gap-4">
                      <FormField
                        control={resetPassForm.control}
                        name="otp"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-black">
                              OTP
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter OTP..."
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
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
                            <FormLabel className="text-sm font-medium text-black">
                              Password
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type={showPassword ? 'text' : 'password'}
                                  placeholder="New Password..."
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                  type="button"
                                  onClick={togglePasswordVisibility}
                                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm"
                                >
                                  {showPassword ? <Eye /> : <EyeOff />}
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
                        className="flex items-center justify-center gap-2 group bg-[#4CB847] hover:bg-[#3A9236] text-white font-medium py-2 px-4 rounded-md transition-colors">
                                                Reset Password

                        <ArrowRight
                      className="ml-2 w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 text-white transition-all duration-200"
                      size={20}
                    />
                      </button>

                      {/* <button
                        disabled={loading}
                        type="submit"
                        className="py-2 px-8 bg-black text-white rounded cursor-pointer hover:scale-100"
                      >
                        Reset Password
                      </button> */}
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
                            <FormLabel className="text-sm font-medium text-black">
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Email Address..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />


                      <button
                        disabled={loading}
                        type="submit"
                        className="flex items-center justify-center gap-2 group bg-[#4CB847] hover:bg-[#3A9236] text-white font-medium py-2 px-4 rounded-md transition-colors">
                        Submit
                        <ArrowRight
                      className="ml-2 w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 text-white transition-all duration-200"
                      size={20}
                    />
                      </button>
                    </div>
                  </form>
                </Form>
              )}
            </DialogContent>
          </Dialog>

          <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
              <DialogHeader>
                <DialogTitle className=" pt-6 pl-6">
                  Welcome to Stubby
                </DialogTitle>
                <DialogDescription className="text-black pl-6">
                  Create your account to get started
                </DialogDescription>
              </DialogHeader>

              <Form {...signupForm}>
                <form
                  onSubmit={signupForm.handleSubmit(onSubmit)}
                  className="pt-3 pr-6 pl-6"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={signupForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-black">
                            First Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John"
                              {...field}
                              className="h-10 transition-all focus:outline-none focus:ring-0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={signupForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-black">
                            Last Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Doe"
                              {...field}
                              className="h-10 transition-all focus:outline-none focus:ring-0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={signupForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-black">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="you@example.com"
                            type="email"
                            {...field}
                            className="h-10 transition-all focus:outline-none focus:ring-0"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signupForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-black">
                          Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Create a strong password"
                              {...field}
                              className="h-10 pr-10 transition-all focus:outline-none focus:ring-0"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                              {showPassword ? (
                                <Eye className="h-4 w-4" />
                              ) : (
                                <EyeOff className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4 pb-6">
                    <FormField
                      control={signupForm.control}
                      name="phoneNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-black">
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="+1 (555) 000-0000"
                              {...field}
                              className="h-10 transition-all focus:outline-none focus:ring-0"
                              onInput={(e) => {
                                if (e.target instanceof HTMLInputElement) {
                                  e.target.value = e.target.value.replace(
                                    /[^0-9+]/g,
                                    ''
                                  );
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={signupForm.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-black">
                            Gender
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-10 transition-all focus:outline-none focus:ring-0">
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
                  <div className="flex flex-col gap-4 pb-6">
                    <FormField
                      control={signupForm.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-black ">
                            Date of Birth
                          </FormLabel>
                          <Popover
                            open={calendarOpen}
                            onOpenChange={setCalendarOpen}
                          >
                            {' '}
                            {/* Bind calendar visibility to the state */}
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    'h-10 w-full pl-3 text-left font-normal transition-all focus:outline-none focus:ring-0',
                                    !field.value && 'text-gray-400'
                                  )}
                                >
                                  {field.value
                                    ? format(field.value, 'PPP')
                                    : 'Pick a date'}
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
                                onSelect={(date) => {
                                  field.onChange(date); // Update the form field value with the selected date
                                  setCalendarOpen(false); // Close the calendar after selecting a date
                                }}
                                aria-label="Date (Show Month and Year Picker)"
                                // showMonthAndYearPickers
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />



                    <Button
                      type="submit"
                      className="flex items-center justify-center gap-2 group bg-[#4CB847] hover:bg-[#3A9236] text-white font-medium py-2 px-4 rounded-md transition-colors">

                      Create Account

                      <ArrowRight
                      className="ml-2 w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 text-white transition-all duration-200"
                      size={20}
                    />
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}

