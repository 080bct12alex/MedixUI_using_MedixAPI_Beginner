import { useEffect, useState } from "react";
import { fetchPatients } from "@/lib/api";

export default function PatientList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients().then(setPatients);
  }, []);

  return (
    <div>
      <h1>Patient Records</h1>
      <ul>
        {Object.entries(patients).map(([id, patient]: any) => (
          <li key={id}>
            <strong>{id}</strong>: {patient.name} ({patient.age} yrs) - {patient.verdict}
          </li>
        ))}
      </ul>
    </div>
  );
}
