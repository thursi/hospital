import { Doctor } from "@/lib/typings";

interface Props{
    doctor: Doctor
    key: string
}

const DoctorCard = ({doctor, key}: Props) => {
  return <div className="w-1/2 bg-white rounded-lg shadow-md ">

  </div>;
};

export default DoctorCard;
