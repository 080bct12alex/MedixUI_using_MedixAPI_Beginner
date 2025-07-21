"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchPatient, updatePatient } from "@/lib/api";

export default function EditPatient() {
  const router = useRouter();
  const { id } = useParams();

  const patientId = Array.isArray(id) ? id[0] : id;

  const [formData, setFormData] = useState<any>(null);

  const [currentDiagnosis, setCurrentDiagnosis] = useState({
    disease: '',
    condition: '',
    diagnosis_on: new Date().toISOString().split('T')[0],
    notes: '',
  });

  useEffect(() => {
    if (patientId) {
      fetchPatient(patientId).then((data) => {
        setFormData({ ...data, diagnoses_history: data.diagnoses_history || [] });
      });
    }
  }, [patientId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    let parsedValue: string | number = value;
    if (name === "age" || name === "height" || name === "weight") {
      parsedValue = value === "" ? "" : parseFloat(value);
    }

    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  const handleDiagnosisChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentDiagnosis({ ...currentDiagnosis, [name]: value });
  };

  const handleAddDiagnosis = () => {
    setFormData((prev: any) => ({
      ...prev,
      diagnoses_history: [...prev.diagnoses_history, currentDiagnosis],
    }));
    setCurrentDiagnosis({
      disease: '',
      condition: '',
      diagnosis_on: new Date().toISOString().split('T')[0],
      notes: '',
    });
  };

  const handleRemoveDiagnosis = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      diagnoses_history: prev.diagnoses_history.filter((_: any, i: number) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId) return;

    await updatePatient(patientId, formData);
    router.push("/patients");
  };

  if (!formData) return <div className="p-6">Loading...</div>;

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
          Edit Patient
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="id" className="mb-2 font-medium text-gray-700 capitalize">ID</label>
            <input id="id" type="text" name="id" value={formData.id} readOnly className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-100 cursor-not-allowed" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 font-medium text-gray-700 capitalize">Name </label>
            <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} required className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="city" className="mb-2 font-medium text-gray-700 capitalize">City </label>
            <input id="city" type="text" name="city" value={formData.city} onChange={handleChange} required className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="age" className="mb-2 font-medium text-gray-700 capitalize">Age </label>
            <input id="age" type="number" name="age" value={formData.age} onChange={handleChange} required min={1} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="gender" className="mb-2 font-medium text-gray-700 capitalize">Gender</label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="height" className="mb-2 font-medium text-gray-700 capitalize">Height (mtrs)</label>
            <input id="height" type="number" name="height" value={formData.height === null ? "" : formData.height} onChange={handleChange} step="0.01" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="weight" className="mb-2 font-medium text-gray-700 capitalize">Weight (kgs)</label>
            <input id="weight" type="number" name="weight" value={formData.weight === null ? "" : formData.weight} onChange={handleChange} step="0.01" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400" />
          </div>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Diagnosis History </h2>
          <div className="space-y-4 border p-4 rounded-md">
            <div className="flex flex-col">
              <label htmlFor="disease" className="mb-2 font-medium text-gray-700 capitalize">Disease</label>
              <input id="disease" type="text" name="disease" value={currentDiagnosis.disease} onChange={handleDiagnosisChange} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="condition" className="mb-2 font-medium text-gray-700 capitalize">Condition</label>
              <input id="condition" type="text" name="condition" value={currentDiagnosis.condition} onChange={handleDiagnosisChange} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="diagnosis_on" className="mb-2 font-medium text-gray-700 capitalize">Diagnosis Date</label>
              <input id="diagnosis_on" type="date" name="diagnosis_on" value={currentDiagnosis.diagnosis_on} onChange={handleDiagnosisChange} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="notes" className="mb-2 font-medium text-gray-700 capitalize">Notes</label>
              <textarea id="notes" name="notes" value={currentDiagnosis.notes} onChange={handleDiagnosisChange} rows={3} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"></textarea>
            </div>
            <button type="button" onClick={handleAddDiagnosis} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold transition">
              Add Diagnosis
            </button>
          </div>

          {formData.diagnoses_history.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Added Diagnoses:</h3>
              <ul className="list-disc pl-5 space-y-2">
                {formData.diagnoses_history.map((entry: any, index: number) => (
                  <li key={index} className="bg-gray-50 p-3 rounded-md flex justify-between items-center">
                    <div>
                      <p><strong>Disease:</strong> {entry.disease}</p>
                      <p><strong>Condition:</strong> {entry.condition}</p>
                      <p><strong>Date:</strong> {entry.diagnosis_on}</p>
                    </div>
                    <button type="button" onClick={() => handleRemoveDiagnosis(index)} className="text-red-500 hover:text-red-700">
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition"
          >
            Update Patient
          </button>
        </form>
      </div>
    </div>
  );
}
