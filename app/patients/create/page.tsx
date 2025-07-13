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
      {/* Back Button */}
      <button
        onClick={() => router.push("/patients")}
        className="mb-6 inline-flex items-center text-blue-600 border border-blue-500 px-3 py-1.5 rounded-md hover:bg-blue-50 transition"
      >
        ← Back to Patient List
      </button>

      <div className="bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-semibold mb-8 text-gray-900">
          Add New Patient
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {Object.keys(formData).map((key) => (
            <div key={key} className="flex flex-col">
              <label
                htmlFor={key}
                className="mb-2 font-medium text-gray-700 capitalize"
              >
                {key.replace(/_/g, " ")}
              </label>

              {key === "gender" ? (
                <select
                  id={key}
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              ) : (
                <input
                  id={key}
                  type={
                    typeof formData[key as keyof typeof formData] === "number"
                      ? "number"
                      : "text"
                  }
                  name={key}
                  value={formData[key as keyof typeof formData]}
                  onChange={handleChange}
                  required
                  min={key === "age" ? 1 : undefined}
                  step={key === "height" || key === "weight" ? "0.01" : undefined}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold transition"
          >
            Create Patient
          </button>
        </form>
      </div>
    </div>
  );
}
