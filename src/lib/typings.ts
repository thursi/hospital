export type Appointment = {
  id: string;
  bookingDate: string;
  time: string;
  doctorResponse?: {
    id: string;
    name: string;
    email: string;
    phoneNo: string;
    dateOfBirth: string;
    gender: string;
  };
  medicineResponse?: {
    id: string;
    name: string;
  };
  description: string;
  status: string;
  bookingType: string;
  userResponse: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNo: string;
    dateOfBirth: string;
    gender: string;
  };
};


export type HospitalCreate = {
  name: string;
  description?: string;
  cityId: number;
  district: string;
  province: string;
  address: string;
  latitude: number;
  longitude: number;
  openTime: string;
  closeTime: string;
  phoneNumber: string;
  email: string;
  website?: string;
  medicineIds: number[]; 
};

export type Doctor = {
  id: string;
  name: string;
  email: string;
  phoneNo: string;
  dateOfBirth: string;
  gender: string;
  specializationId: string;
  specializationName: string;
  description: string;
  departmentId: string;
  departmentName: string;
  qualification: string;
  image: string;
  preSignedUrl: string;
  duration: number;
  active: boolean;
  dayTimeSlotResponses: {
    day: string;
    timeSlots: { startTime: string; endTime: string }[];
    appointmentTimes: string[];
  }[];
};

export type DoctorCreate = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  dateOfBirth: Date;
  gender: string;
  specializationId: string;
  description: string;
  duration: number;
  departmentId?:number,
  qualification: string,
  petIds: number[];
};

export type DayTimeSlotResponses = {
  day: string;
  timeSlots: { startTime: string; endTime: string }[] | [];
  appointmentTimes: string[];
};

export type PetResponse = {
  id: string;
  name: string;
  description: string;
  image: string;
  preSignedUrl: string;
  createdDate: string;
  updatedDate: string;
  active: boolean;
};
export type Department = {
  name: string;
  description: string;
};

export type Pet = {
  name: string;
  description: string;
};

export type Medicine = {
  id: string;
  name: string;
  description: string;
  image: string;
  preSignedUrl: string;
  duration: number;
  dayTimeSlotResponses: {
    day: string;
    timeSlots: { startTime: string; endTime: string }[];
    appointmentTimes: string[];
  }[];
};

export type MedicineCreate = {
  name: string;
  description: string;
  duration: number;
};

export type Specialization = {
  specializationName: string;
  description?: string;
  departmentId: string;
};

export type AppointmentCreate = {
  id: string;
  bookingDate: string;
  bookingType: string;
  userId: string;
  time: string;
  petName: string;
  petType: string;
  description: string;
  petAge: number;
};
export type dayTimeSlotResponses = {
  day: string;
  medicineTimeSlots: { startTime: string; endTime: string }[] | [];
  appointmentTimes: string[];
};

export type DoctorBooking = {
  id: string;
  name: string;
  email: string;
  phoneNo: string;
  dateOfBirth: string;
  gender: string;
  specialization: string;
  description: string;
  department: string;
};

export type UserBooking = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  dateOfBirth: string;
  gender: string;
};
export type MedicineBooking = {
  name: string;
  description: string;
};

export type Booking = {
  id: string;
  bookingDate: string;
  time: string;
  description: string;
  status: string;
  bookingType: string;
  petName: string;
  petAge: string;
  petType: string;
  createdDate: string;
  updatedDate: string;
  doctorResponse: DoctorBooking;
  medicineResponse: MedicineBooking;
  userResponse: UserBooking;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phoneNo: string;
  dateOfBirth: string;
  gender: string;
  image: string;
  preSignedUrl: string;
  role: string;
  active: boolean;
};
export type Hospital = {
  id: number;
  name: string;
  description: string;
  city: string;
  district: string;
  province: string;
  address: string;
  phoneNumber: string;
  email: string;
  website: string;
  latitude: number;
  longitude: number;
  openTime: string;
  closeTime: string;
  image: string | null;
  preSignedUrl: string | null;
  createdDate: string;
  updatedDate: string;
  doctorDepartmentResponses: {
    departmentResponse: departmentResponse[];
    doctorResponses: doctorResponses[];
  }[];
  medicineResponses: medicineResponse[];
  active: boolean;
};
export type departmentResponse = {
  id: number;
  name: string;
  description: string;
  image: string;
  preSignedUrl: string | null;
  createdDate: string;
  updatedDate: string;
  active: boolean;
};

export type doctorResponses = {
  id: any;
  name: string;
  email: string;
  phoneNo: string;
  dateOfBirth: string;
  gender: string;
  specializationId: number;
  specializationName: string;
  description: string;
  departmentId: number | null;
  departmentName: string | null;
  qualification: string | null;
  image: string | null;
  preSignedUrl: string | null;
  duration: number;
  dayTimeSlotResponses:
    | {
        day: string;
        timeSlots: { startTime: string; endTime: string }[];
        appointmentTimes: string[];
      }[]
    | null;
  createdDate: string;
  updatedDate: string;
  active: boolean;
};
export type medicineResponse = {
  id: number;
  name: string;
  description: string;
  image: string;
  preSignedUrl: string | null;
  dayTimeSlotResponses: any | null;
  duration: any;
  createdDate: string;
  updatedDate: string;
  active: boolean;
};
