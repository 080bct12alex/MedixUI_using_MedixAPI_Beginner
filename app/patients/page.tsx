//app/patients/page.tsx (Patients List)
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchPatients, deletePatient } from "@/lib/api";

export default function PatientsPage() {
  const [patients, setPatients] = useState<Record<string, any>>({});

  const loadPatients = async () => {
    const data = await fetchPatients();
    setPatients(data);
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this patient?")) {
      await deletePatient(id);
      loadPatients();
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Patient Records</h1>
        <Link
          href="/patients/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          ➕ Add Patient
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(patients).map(([id, patient]) => (
          <div
            key={id}
            className="bg-white shadow-sm border rounded-lg p-4 flex flex-col justify-between"
          >
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-1">{patient.name}</h2>
              <p className="text-sm text-gray-600">
                BMI: <span className="font-semibold">{patient.bmi}</span> — Verdict: <span className="text-indigo-600 font-medium">{patient.verdict}</span>
              </p>
            </div>
            <div className="flex justify-end gap-4">
              <Link href={`/patients/${id}`} className="text-blue-600 hover:underline">
                View
              </Link>
              <Link href={`/patients/edit/${id}`} className="text-yellow-600 hover:underline">
                Edit
              </Link>
              <button
                onClick={() => handleDelete(id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
