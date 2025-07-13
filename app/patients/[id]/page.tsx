"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchPatient } from "@/lib/api";

export default function ViewPatient() {
  const { id } = useParams();
  const router = useRouter();

  // Fix: ensure patientId is a string
  const patientId = Array.isArray(id) ? id[0] : id;

  const [patient, setPatient] = useState<any>(null);

  useEffect(() => {
    if (patientId) {
      fetchPatient(patientId).then(setPatient);
    }
  }, [patientId]);

  if (!patient) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[50vh]">
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
      </div>
    );
  }

  const formatValue = (value: any) => {
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (typeof value === "object") return JSON.stringify(value, null, 2);
    if (typeof value === "string" && value.match(/^\d{4}-\d{2}-\d{2}/)) {
      return new Date(value).toLocaleDateString();
    }
    return value;
  };

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

      {/* Patient Details Card */}
      <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-3">
          🧑‍⚕️ Patient Details
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {Object.entries(patient).map(([key, value]) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
