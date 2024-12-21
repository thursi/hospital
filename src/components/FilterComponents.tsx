"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const FilterComponent = () => {
  const [specializationId, setSpecializationId] = useState<number | null>(null);
  const [departmentId, setDepartmentId] = useState<number | null>(null);
  const [day, setDay] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Initial load or when filters change
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/doctors", {
          params: {
            specializationId,
            departmentId,
            day,
            name,
          },
        });
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [specializationId, departmentId, day, name]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "specializationId":
        setSpecializationId(value ? parseInt(value) : null);
        break;
      case "departmentId":
        setDepartmentId(value ? parseInt(value) : null);
        break;
      case "day":
        setDay(value || null);
        break;
      case "name":
        setName(value || null);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="specializationId" className="block">Specialization:</label>
        <input
          type="number"
          id="specializationId"
          name="specializationId"
          placeholder="Specialization ID"
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="departmentId" className="block">Department:</label>
        <input
          type="number"
          id="departmentId"
          name="departmentId"
          placeholder="Department ID"
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="day" className="block">Day:</label>
        <input
          type="text"
          id="day"
          name="day"
          placeholder="Day (e.g., MONDAY)"
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="name" className="block">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Doctor's Name"
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded-md"
        />
      </div>
      <button
        onClick={() => setSpecializationId(specializationId)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Apply Filters
      </button>
      {loading && <p>Loading...</p>}
      <div>
        <h3 className="text-lg font-semibold mt-4">Filtered Doctors:</h3>
        <ul>
          {doctors.map((doctor: any) => (
            <li key={doctor.id} className="border p-4 mb-2 rounded-md">
              <Image 
                src={doctor.preSignedUrl} 
                alt={doctor.name} 
                className="w-20 h-20 rounded-full" 
                width={80} 
                height={80} 
              />
              <h4 className="text-lg font-semibold">{doctor.name}</h4>
              <p>{doctor.specialization?.name}</p>
              <p>{doctor.specialization?.department?.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterComponent;
