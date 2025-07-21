'use client';

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import ConfirmDialog from '@/app/components/ConfirmDialog';
import { fetchPatient, deletePatient } from "@/lib/api";

interface Diagnosis {
  disease: string;
  condition: string;
  diagnosis_on: string;
  notes: string;
}

interface Patient {
  id: string;
  name: string;
  city: string;
  age: number;
  gender: string;
  height: number | null;
  weight: number | null;
  diagnoses_history: Diagnosis[];
}

export default function ViewPatient() {
  const { id } = useParams();
  const router = useRouter();

  const patientId = Array.isArray(id) ? id[0] : id;

  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (patientId) {
      fetchPatient(patientId)
        .then(setPatient)
        .catch((err) => {
          console.error("Failed to fetch patient:", err);
          setError("Patient not found or an error occurred.");
        });
    }
  }, [patientId]);

  const confirmDelete = async () => {
    if (patientId) {
      await deletePatient(patientId);
      router.push('/patients');
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  const formatValue = (value: any) => {
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (typeof value === "object") return JSON.stringify(value, null, 2);
    if (typeof value === "string" && value.match(/^\d{4}-\d{2}-\d{2}/)) {
      return new Date(value).toLocaleDateString();
    }
    return value;
  };

  if (!patient) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[50vh]">
        {error ? (
          <div className="flex flex-col items-center">
            <span className="text-red-500 text-lg font-medium">
              {error}
            </span>
            <button
              onClick={() => router.push('/patients')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Go to Patients List
            </button>
          </div>
        ) : (
          <>
            <svg
              className="animate-spin h-8 w-8 text-blue-600 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            <span className="text-gray-500 text-lg font-medium">
              Loading patient data...
            </span>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto mt-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center px-4 py-2 rounded-md text-blue-600 border border-blue-500 hover:bg-blue-50 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Go back to patient list"
      >
        ← Back to Patient List
      </button>

      <div className="flex justify-end gap-4 mb-6">
        <Link href={`/patients/edit/${patientId}`} className="p-2 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition" title="Edit Patient">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14.25v4.5a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18V7.5a2.25 2.25 0 012.25-2.25H9" />
          </svg>
        </Link>
        <button
          onClick={() => setShowConfirm(true)}
          className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
          title="Delete Patient"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9.03A.75.75 0 0116 9.75v4.5a.75.75 0 01-1.5 0V9.75zm-7.5 0A.75.75 0 019 9.75v4.5a.75.75 0 01-1.5 0V9.75z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M6 6v12a2 2 0 002 2h8a2 2 0 002-2V6M10 11v6M14 11v6" />
          </svg>
        </button>
      </div>

      {/* Patient Details Card */}
      <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-3">
          🧑‍⚕️ Patient Details
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {Object.entries(patient).map(([key, value]) => {
            if (key === "diagnoses_history") return null; // Exclude diagnoses_history from general display
            return (
              <div
                key={key}
                className="bg-gray-50 p-4 rounded-lg border border-gray-200"
              >
                <p className="text-sm font-medium text-gray-600 capitalize mb-1">
                  {key.replace(/_/g, " ")}
                </p>
                <pre
                  className={`text-gray-900 text-base break-words whitespace-pre-wrap ${
                    typeof value === "object" ? "font-mono" : ""
                  }`}
                >
                  {formatValue(value)}
                </pre>
              </div>
            );
          })}
        </div>

        {patient.diagnoses_history && patient.diagnoses_history.length > 0 ? (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Diagnosis History
            </h2>
            <div className="space-y-4">
              {patient.diagnoses_history.map((entry: Diagnosis, index: number) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-600">Disease: <span className="font-normal text-gray-900">{entry.disease}</span></p>
                  <p className="text-sm font-medium text-gray-600">Condition: <span className="font-normal text-gray-900">{entry.condition}</span></p>
                  <p className="text-sm font-medium text-gray-600">Diagnosis Date: <span className="font-normal text-gray-900">{new Date(entry.diagnosis_on).toLocaleDateString()}</span></p>
                  {entry.notes && <p className="text-sm font-medium text-gray-600">Notes: <span className="font-normal text-gray-900">{entry.notes}</span></p>}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Diagnosis History
            </h2>
            <p className="text-gray-600">None</p>
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        message="Are you sure you want to delete this patient? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
