"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPatient } from "@/lib/api";

export default function CreatePatient() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    city: "",
    age: 0,
    gender: "male",
    height: 0,
    weight: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "age" || name === "height" || name === "weight"
          ? parseFloat(value)
          : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPatient(formData);
    router.push("/patients");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Add New Patient</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label className="block mb-1 font-semibold capitalize">{key}</label>
            {key === "gender" ? (
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            ) : (
              <input
                type={
                  typeof formData[key as keyof typeof formData] === "number"
                    ? "number"
                    : "text"
                }
                name={key}
                value={formData[key as keyof typeof formData]}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
                required
                min={key === "age" ? 1 : undefined}
                step={key === "height" || key === "weight" ? "0.01" : undefined}
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </form>
    </div>
  );
}
