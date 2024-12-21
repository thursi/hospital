'use client';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  faCamera
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import './Scheduler.css';

interface DoctorProfileProps {
  handleEdit: () => void;
  handleSave: (
    newName: string,
    newDescription: string,
    newSpecialiction: string,
    newPersonalData: PersonalData
  ) => void;
  handleProfilePictureUpdate: (newImageSrc: string) => void;
  name: string;
  description: string;
  Specialiction: string;
  imageSrc: string;
  isEditing: boolean;
}

interface PersonalData {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  country: string;
  city: string;
  state: string;
  zipCode: string;
  address: string;
  phoneNumber: string;
  email: string;
}

const DoctorProfile: React.FC<DoctorProfileProps> = ({
  handleEdit,
  handleSave,
  handleProfilePictureUpdate,
  name,
  description,
  Specialiction,
  imageSrc,
  isEditing,
}) => {
  const [editName, setEditName] = useState(name);
  const [editDescription, setEditDescription] = useState(description);
  
  const [editSpecialiction, setEditSpecialiction] = useState(Specialiction);  
  const [editQualification, setEditQualification ]= useState();
  
  const [editPersonalData, setEditPersonalData] = useState<PersonalData>({
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    country: '',
    city: '',
    state: '',
    zipCode: '',
    address: '',
    phoneNumber: '',
    email: '',
  });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const defaultImage = '/department.png';

  const handleSaveClick = () => {
    handleSave(editName, editDescription, editSpecialiction, editPersonalData);
    setIsEdit(false); // Disable editing after saving
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click(); // Trigger the file input click
  };

  const handleInputChange = (field: keyof PersonalData, value: string) => {
    setEditPersonalData({
      ...editPersonalData,
      [field]: value,
    });
  };

  return (
    <div className="container mx-auto mt-14 mb-20 px-4">
      <div className="flex flex-col w-full">
        <Card className="bg-gray-200 relative">
          <CardHeader>
            <CardTitle>Personal Data</CardTitle>
            <div className="grid grid-cols-2 gap-4 p-4">
              <div>
                <label className="block text-gray-700">First name</label>

                <input
                  type="text"
                  value={editPersonalData.firstName}
                  onChange={(e) =>
                    handleInputChange('firstName', e.target.value)
                  }
                  className="bg-slate-300 text-black p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700">Middle name</label>

                <input
                  type="text"
                  value={editPersonalData.middleName}
                  onChange={(e) =>
                    handleInputChange('middleName', e.target.value)
                  }
                  className="bg-slate-300 text-black p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700">Last name</label>

                <input
                  type="text"
                  value={editPersonalData.lastName}
                  onChange={(e) =>
                    handleInputChange('lastName', e.target.value)
                  }
                  className="bg-slate-300 text-black p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700">Date of birth</label>

                <input
                  type="date"
                  value={editPersonalData.dateOfBirth}
                  onChange={(e) =>
                    handleInputChange('dateOfBirth', e.target.value)
                  }
                  className="bg-slate-300 text-black p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700">Gender</label>

                <div className="flex items-center">
                  <label className="inline-flex items-center mr-4">
                    <input
                      type="radio"
                      className="form-radio"
                      value="Male"
                      checked={editPersonalData.gender === 'Male'}
                      onChange={(e) =>
                        handleInputChange('gender', e.target.value)
                      }
                    />
                    <span className="ml-2">Male</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      value="Female"
                      checked={editPersonalData.gender === 'Female'}
                      onChange={(e) =>
                        handleInputChange('gender', e.target.value)
                      }
                    />
                    <span className="ml-2">Female</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-gray-700">Country</label>

                <input
                  type="text"
                  value={editPersonalData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="bg-slate-300 text-black p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700">City</label>

                <input
                  type="text"
                  value={editPersonalData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="bg-slate-300 text-black p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700">State</label>

                <input
                  type="text"
                  value={editPersonalData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="bg-slate-300 text-black p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700">ZIP code</label>

                <input
                  type="text"
                  value={editPersonalData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  className="bg-slate-300 text-black p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700">Address</label>

                <input
                  type="text"
                  value={editPersonalData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="bg-slate-300 text-black p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700">Phone number</label>

                <input
                  type="text"
                  value={editPersonalData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange('phoneNumber', e.target.value)
                  }
                  className="bg-slate-300 text-black p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700">Email address</label>

                <input
                  type="email"
                  value={editPersonalData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-slate-300 text-black p-2 rounded w-full"
                />
              </div>
            </div>
          </CardHeader>
          <CardHeader>
            <CardTitle>Doctor Data</CardTitle>
            <div className="flex ">
              <div className="flex-1 pl-4 text-lg font-bold whitespace-nowrap">
                <div className="relative overflow-hidden flex items-center justify-center w-48 h-48 pt-8 border-1 bg-slate-300 border-black">
                  <Image
                    src={imageSrc}
                    width={1500}
                    height={1500}
                    alt="Profile Picture"
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                  <FontAwesomeIcon
                    icon={faCamera}
                    className="absolute bottom-4 right-4 text-red-500 cursor-pointer"
                    size="lg"
                    onClick={handleProfilePictureClick}
                  />
                </div>
              </div>
              <div className="flex-1 pl-4 pt-8 text-gray-500">
              <div className="pt-4">
                <label className="block text-gray-700">Specialiction</label>
                  
                  <input
                    type="text"
                    value={editSpecialiction}
                    className="bg-slate-300 p-2 rounded"
                    style={{ width: 'auto', height: '40px', borderRadius: 2 }}
                   
                  />
             
                </div>
                <div className="pt-4">
                <label className="block text-gray-700">Qualification</label>

                  <input
                    type="text"
                    className="bg-slate-300 p-2 rounded"
                    value={editQualification}
                    style={{ width: 'auto', height: '40px', borderRadius: 2 }}
                  
                  />
           
                </div>
                <div className="pt-4">
                <label className="block text-gray-700">Description</label>

                  <textarea
                    value={editDescription}
                    className="bg-slate-300 p-2 rounded"
                    style={{ width: '750px', height: '150px' }}
                  
                  />
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              handleProfilePictureUpdate(reader.result as string);
            };
            reader.readAsDataURL(file);
          }
        }}
      />
    </div>
  );
};

export default DoctorProfile;
