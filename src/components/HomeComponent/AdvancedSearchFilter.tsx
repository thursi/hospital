import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CalendarIcon,
  ArrowRight,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
interface FilterDropdownProps {
  options: Array<{ value: string; label: string }>;
  placeholder: string;
  onChange: (value: any) => void;
  value: any;
}

interface AdvancedSearchProps {
  citiesOptions: Array<{ value: string; label: string }>;
  hospitalsOptions: Array<{ value: string; label: string }>;
  departmentOptions: Array<{ value: string; label: string }>;
  specializationOptions: Array<{ value: string; label: string }>;
  petsOptions: Array<{ value: string; label: string }>;
  onSearch: (filters: any) => void;
}

const FilterDropdown = ({
  options,
  placeholder,
  onChange,
  value,
}: FilterDropdownProps) => {
  return (
    <select
      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      onChange={(e) => onChange(e.target.value)}
      value={value || ''}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

const AdvancedSearchFilter = ({
  citiesOptions,
  hospitalsOptions,
  specializationOptions,
  petsOptions,
  departmentOptions,
  onSearch,
}: AdvancedSearchProps) => {
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [showError, setShowError] = useState(false);
  const [docName, setDocName] = useState<any>('');

  const [hospitalType, setHospitalType] = useState('');
  const [nameSpecialization, setSelectedSpecialization] = useState<any>('');
  const [selectedDeparment, setSelectedDeparment] = useState<any>('');
  const [selectedPet, setSelectedPet] = useState<any>('');
  const [location, setLocation] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [gender, setGender] = useState('');
  const [sessionTime, setSessionTime] = useState('');
  const [date, setDate] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<any>(''); // State for selected date

  const handleSearch = () => {
    if (!hospitalName && !specialization && !doctorName) {
      setShowError(true);
      return;
    }
    setShowError(false);
    onSearch({
      hospitalType,
      location,
      hospitalName,
      specialization,
      gender,
      sessionTime,
      date,
      priceRange,
      doctorName,
    });
  };

  const hospitalTypes = [
    { value: 'private', label: 'Private Hospital' },
    { value: 'public', label: 'Public Hospital' },
  ];

  const genderOptions = [
    { value: 'any', label: 'Any' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  const priceRangeOptions = [
    { value: 'any', label: 'Any' },
    { value: '0-1000', label: '₹0 - ₹1000' },
    { value: '1000-2000', label: '₹1000 - ₹2000' },
    { value: '2000+', label: '₹2000+' },
  ];

  const handleDateChange = (e: any) => {
    const inputDate = e.target.value;
    setDocName(inputDate);
  };

  return (
    <div className="relative z-5 w-full px-4 pb-8 -mt-20 mx-auto">
      <div>
        <div className="flex justify-center mt-4 items-center mb-4">
          <button
            onClick={() => setIsAdvancedSearch(!isAdvancedSearch)}
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            Advanced search
            {isAdvancedSearch ? (
              <ChevronUp className="ml-1" />
            ) : (
              <ChevronDown className="ml-1" />
            )}
          </button>
        </div>

        {isAdvancedSearch && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <hr className="my-4 border-t-2 border-gray-300" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <input
                type="text"
                placeholder="Search doctors"
                value={docName}
                onChange={handleDateChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />

              {/* <FilterDropdown
                options={hospitalsOptions}
                placeholder="👩‍⚕️ Select Doctor"
                onChange={setDocName}
                value={docName}
              /> */}

              {/* <FilterDropdown
                options={citiesOptions}
                placeholder="📍 Location"
                onChange={setLocation}
                value={location}
              /> */}
              {/* <FilterDropdown
                options={genderOptions}
                placeholder="Gender"
                onChange={setGender}
                value={gender}
              /> */}
              <FilterDropdown
                options={specializationOptions}
                placeholder="👩‍⚕️ Select Specialization"
                onChange={setSelectedSpecialization}
                value={nameSpecialization}
              />

              <FilterDropdown
                options={departmentOptions}
                placeholder="👩‍⚕️ Select Department"
                onChange={setSelectedDeparment}
                value={selectedDeparment}
              />

              <FilterDropdown
                options={petsOptions}
                placeholder="👩‍⚕️ Select Pet"
                onChange={setSelectedPet}
                value={selectedPet}
              />

              <div className="relative">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <button className="bg-white border border-gray-500 rounded-lg px-4 py-2 w-full flex justify-between items-center text-sm font-medium hover:bg-gray-50">
                      {selectedDate
                        ? format(selectedDate, 'PPP')
                        : '📅 Select Date'}
                      <CalendarIcon className="h-4 w-4 text-gray-500" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="p-0 z-50">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date);
                        setOpen(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <button
                onClick={onSearch}
                // className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center group transition-colors"
  className="flex items-center justify-center group bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
             
             >
                Search
                <ArrowRight 
    className="ml-2 w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 text-white transition-all duration-200" 
    size={20}
  />
              </button>
            </div>
          </div>
        )}

        {showError && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-red-700">
                Please ensure to provide hospital, specialization or doctor
                along with other search criteria.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedSearchFilter;
