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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Patient Records</h1>
      <Link
        href="/patients/create"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Patient
      </Link>
      <ul className="mt-6 space-y-4">
        {Object.entries(patients).map(([id, patient]) => (
          <li
            key={id}
            className="border p-4 rounded shadow flex flex-col md:flex-row justify-between items-center"
          >
            <div>
              <div className="font-bold text-lg">{patient.name}</div>
              <div>
                BMI: {patient.bmi} — Verdict: {patient.verdict}
              </div>
            </div>
            <div className="space-x-4 mt-3 md:mt-0">
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
          </li>
        ))}
      </ul>
    </div>
  );
}
