"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchPatient } from "@/lib/api";

export default function ViewPatient() {
  const { id } = useParams();
  const [patient, setPatient] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetchPatient(id).then(setPatient);
    }
  }, [id]);

  if (!patient) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Patient Details</h1>
      <ul className="space-y-2">
        {Object.entries(patient).map(([key, value]) => (
          <li key={key}>
            <strong className="capitalize">{key}</strong>: {value.toString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
