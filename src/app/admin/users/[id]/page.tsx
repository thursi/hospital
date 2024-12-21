"use client";
import React, { useState } from "react";
import {
  Pencil,
  Mail,
  Phone,
  Calendar,
  MapPin,
  UserCircle,
  Clock,
  XIcon,
  Edit,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import DefaultImage from "../../../../../public/default_user.png";
import { useUserStore } from "@/store/userStore";
import { getUserById, updateUserImage } from "../action";
import { useRouter } from "next/navigation";

const UserProfile = ({ params }: { params: { id: string } }) => {
  const [selectedUser, setSelectedUser, loading] = useUserStore(
    (state: any) => [state.selectedUser, state.setSelectedUser, state.loading]
  );
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [user, setUser] = useState<any>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loadings, setLoading] = useState(false);
  React.useEffect(() => {
    const handleSelectUser = async () => {
      const data = await getUserById(params.id);
      setSelectedUser(data);
      setUser(data);
    };
    handleSelectUser();
  }, [params.id, setSelectedUser,loadings]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  const handleImageChange = (e: any) => {
    const file = e.target?.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        alert("File size exceeds the 2 MB limit.");
        return;
      }

      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    if (!image) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", image);

      const updatedImageUrl = await updateUserImage(params.id, formData);

      if (updatedImageUrl?.success === true) {
        setSelectedUser((prev: any) => ({ ...prev, preSignedUrl: imageUrl }));
        setImage(null);
        setImageUrl(null);
        alert("Image updated successfully!");
      }
    } catch (error) {
      alert("An error occurred while updating the image.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    router.back();
  };
  const InfoItem = ({
    icon: Icon,
    label,
    value,
    color = "text-gray-700",
  }: any) => (
    <div className="flex items-center space-x-3 p-4 w-full bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <Icon className="w-5 h-5 text-purple-500" />
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        <span className={`font-medium ${color}`}>{value || "N/A"}</span>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full mx-auto p-6">
      <Card className="bg-white shadow-lg">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-28 right-11 text-gray-500 hover:text-gray-700"
        >
          <XIcon className="h-5 w-5" />
        </button>
        <CardContent className="p-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="relative group">
              <div className="relative">
                {/* <Image
                  src={selectedUser?.preSignedUrl || DefaultImage}
                  alt={`${selectedUser?.firstName}'s profile`}
                  fill
                  className="rounded-full object-cover border-4 border-purple-100"
                /> */}

                {/* <button className="absolute bottom-2 right-2 p-2 bg-purple-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Pencil className="w-4 h-4" />
                </button> */}

                <div className="relative">
                  <div className="absolute right-1 top-24 p-1 justify-end rounded-t-lg">
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("image-upload")?.click()
                      }
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                  </div>

                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="Preview Image"
                      width={120}
                      height={120}
                      className="w-32 h-32 rounded-lg object-cover bg-gray-100"
                    />
                  ) : selectedUser?.preSignedUrl ? (
                    <Image
                      src={selectedUser.preSignedUrl}
                      alt="Hospital Image"
                      width={120}
                      height={120}
                      className="w-32 h-32 rounded-lg object-cover bg-gray-100"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400 text-xl">No Image</span>
                    </div>
                  )}

                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />

                  {image && (
                    <button
                      type="button"
                      onClick={uploadImage}
                      disabled={loadings}
                      className={`mt-2 px-4 py-2 text-xs rounded-md ${
                        loadings ? "bg-gray-300" : "bg-blue-500 text-white"
                      }`}
                    >
                      {loadings ? "Uploading..." : "Upload Image"}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  {selectedUser?.firstName} {selectedUser?.lastName}
                </h1>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedUser?.active
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedUser?.active ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-lg text-gray-600 italic mb-4">
                {selectedUser?.description || "No Description Provided"}
              </p>
              <div className="inline-flex items-center px-4 py-2 bg-purple-50 rounded-full text-purple-700 font-medium">
                <UserCircle className="w-5 h-5 mr-2" />
                {selectedUser?.role || "N/A"}
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InfoItem icon={Mail} label="Email" value={selectedUser?.email} />
            <InfoItem
              icon={Phone}
              label="Phone Number"
              value={selectedUser?.phoneNo}
            />
            <InfoItem
              icon={Calendar}
              label="Date of Birth"
              value={selectedUser?.dateOfBirth}
            />
            <InfoItem icon={MapPin} label="City" value={selectedUser?.city} />
            <InfoItem
              icon={Clock}
              label="Created Date"
              value={new Date(
                selectedUser?.createdDate || ""
              ).toLocaleDateString()}
            />
            <InfoItem
              icon={Clock}
              label="Updated Date"
              value={new Date(
                selectedUser?.updatedDate || ""
              ).toLocaleDateString()}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
