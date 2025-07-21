'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ConfirmDialog from '@/app/components/ConfirmDialog';
import { fetchPatients, deletePatient, sortPatients, groupPatientsByDisease, groupPatientsByCondition, filterPatients } from '@/lib/api';

export default function PatientsPage() {
  const router = useRouter();
  const [patients, setPatients] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [groupBy, setGroupBy] = useState('');
  const [pendingGroupBy, setPendingGroupBy] = useState('');
  const [filterParams, setFilterParams] = useState({ disease_name: '', condition: '', diagnosed_after_months: '' });
  const [searchPatientId, setSearchPatientId] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadPatients = async () => {
    setLoading(true);
    let data;
    const hasFilters = Object.values(filterParams).some(p => p);

    if (groupBy) {
      data = groupBy === 'disease' ? await groupPatientsByDisease() : await groupPatientsByCondition();
    } else if (sortBy) {
      data = await sortPatients(sortBy, sortOrder);
    } else if (hasFilters) {
      data = await filterPatients(filterParams);
    } else {
      data = await fetchPatients();
    }
    console.log("Fetched patients data:", data);
    setPatients(data);
    setLoading(false);
  };

  const [triggerLoad, setTriggerLoad] = useState(0);

  useEffect(() => {
    loadPatients();
  }, [triggerLoad]);

  const handleDelete = async (id: string) => {
    setPatientToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (patientToDelete) {
      await deletePatient(patientToDelete);
      loadPatients();
      
      setPatientToDelete(null);
      setShowConfirm(false);
    }
  };

  const cancelDelete = () => {
    setPatientToDelete(null);
    setShowConfirm(false);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterParams(prevParams => ({
      ...prevParams,
      [name]: (name === "diagnosed_after_months" || name === "condition") && value === "" ? null : value,
    }));
    setSortBy('');
    setGroupBy('');
  };

  return (
        
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Patient Records</h1>
        <Link href="/patients/create" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          ➕ Add Patient
        </Link>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          placeholder="Search Patient by ID"
          value={searchPatientId}
          onChange={(e) => setSearchPatientId(e.target.value)}
          className="border px-2 py-1 rounded w-64"
        />
        <button
          onClick={() => {
            if (searchPatientId) {
              router.push(`/patients/${searchPatientId}`);
            }
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          View Patient
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        {/* Sort Options */}
        <div className="flex items-center space-x-2 border p-3 rounded-lg bg-white shadow-sm">
          <span className="font-medium text-gray-700">Sort By:</span>
          <select onChange={(e) => { setSortBy(e.target.value); setGroupBy(''); setFilterParams({ disease_name: '', condition: '', diagnosed_after_months: '' }); }} className="border px-2 py-1 rounded">
              <option value="">None</option>
      <option value="_id">Patient ID</option>
      <option value="age">Age</option>
      <option value="latest_diagnosis_date">Diagnosis Date</option>
          </select>
          <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder} className="border px-2 py-1 rounded">
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
          <button onClick={() => { setSortBy(''); setSortOrder('asc'); setTriggerLoad(prev => prev + 1); }} className="ml-2 text-sm text-red-600 hover:text-red-800">Clear Sort</button>
        </div>

        {/* Group By Options */}
        <div className="flex items-center space-x-2 border p-3 rounded-lg bg-white shadow-sm">
          <span className="font-medium text-gray-700">Group By:</span>
          <select onChange={(e) => { setPendingGroupBy(e.target.value); setSortBy(''); setFilterParams({ disease_name: '', condition: '', diagnosed_after_months: '' }); }} className="border px-2 py-1 rounded">
            <option value="">None</option>
            <option value="disease">Disease</option>
            <option value="condition">Condition</option>
          </select>
          <button onClick={() => { setGroupBy(''); setPendingGroupBy(''); setTriggerLoad(prev => prev + 1); }} className="ml-2 text-sm text-red-600 hover:text-red-800">Clear Group</button>
        </div>

        {/* Filter Options */}
        <div className="flex items-center space-x-2 border p-3 rounded-lg bg-white shadow-sm flex-grow">
          <span className="font-medium text-gray-700">Filter By:</span>
          <input type="text" name="disease_name" placeholder="Disease" value={filterParams.disease_name} onChange={handleFilterChange} className="border px-2 py-1 rounded w-32" />
          <input type="text" name="condition" placeholder="Condition" value={filterParams.condition} onChange={handleFilterChange} className="border px-2 py-1 rounded w-32" />
          <input type="number" name="diagnosed_after_months" placeholder="Diagnosed in last X months" value={filterParams.diagnosed_after_months} onChange={handleFilterChange} className="border px-2 py-1 rounded w-48" />
          <button onClick={() => { setFilterParams({ disease_name: '', condition: '', diagnosed_after_months: '' }); setSortBy(''); setGroupBy(''); setTriggerLoad(prev => prev + 1); }} className="ml-2 text-sm text-red-600 hover:text-red-800">Clear Filters</button>
        </div>

        <button
          onClick={() => { 
            setLoading(true);
            setPatients([]);
            setGroupBy(pendingGroupBy); 
            setTriggerLoad(prev => prev + 1); 
          }}
          className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
        >
          Search
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {groupBy ? (
          patients.map((group: any) => (
            <div key={group._id} className="bg-white shadow-sm border rounded-lg p-4 flex flex-col justify-between col-span-full">
              <h2 className="text-xl font-bold mb-4">{group._id}</h2>
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {group.patients && Array.isArray(group.patients) && group.patients.map((patient: any) => (
                  patient && typeof patient.id === 'string' && patient.id !== '' ? (
                    <div key={patient.id} className="bg-gray-50 shadow-sm border rounded-lg p-4 flex flex-col justify-between">
                      <div className="mb-4">
                        <h3 className="text-lg font-bold mb-1">{patient.name}</h3>
                        <p className="text-sm text-gray-600">
                          {patient.latest_condition && `Condition: ${patient.latest_condition}`}
                        </p>
                      </div>
                      <div className="flex justify-end gap-4">
                        <Link href={`/patients/${patient.id}`} className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition" title="View Patient">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </Link>
                        <Link href={`/patients/edit/${patient.id}`} className="p-2 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition" title="Edit Patient">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14.25v4.5a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18V7.5a2.25 2.25 0 012.25-2.25H9" />
                          </svg>
                        </Link>
                        <button onClick={() => handleDelete(patient.id)} className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition" title="Delete Patient">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9.03A.75.75 0 0116 9.75v4.5a.75.75 0 01-1.5 0V9.75zm-7.5 0A.75.75 0 019 9.75v4.5a.75.75 0 01-1.5 0V9.75z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M6 6v12a2 2 0 002 2h8a2 2 0 002-2V6M10 11v6M14 11v6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ) : null
                ))}
              </div>
            </div>
          ))
        ) : (
          patients.map((patient) => (
            patient && typeof patient._id === 'string' && patient._id !== '' ? (
              <div key={patient._id} className="bg-white shadow-sm border rounded-lg p-4 flex flex-col justify-between">
                <div className="mb-4">
                  <h2 className="text-xl font-bold mb-1">{patient.name}</h2>
                  <p className="text-sm text-gray-600">
                    {patient.latest_condition && `Condition: ${patient.latest_condition}`}
                  </p>
                </div>
                <div className="flex justify-end gap-2">
                  <Link href={`/patients/${patient._id}`} className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition" title="View Patient">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </Link>
                  <Link href={`/patients/edit/${patient._id}`} className="p-2 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition" title="Edit Patient">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14.25v4.5a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18V7.5a2.25 2.25 0 012.25-2.25H9" />
                    </svg>
                  </Link>
                <button onClick={() => handleDelete(patient._id)} className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition" title="Delete Patient">

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9.03A.75.75 0 0116 9.75v4.5a.75.75 0 01-1.5 0V9.75zm-7.5 0A.75.75 0 019 9.75v4.5a.75.75 0 01-1.5 0V9.75z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M6 6v12a2 2 0 002 2h8a2 2 0 002-2V6M10 11v6M14 11v6" />
          </svg>
                  </button>
                </div>
              </div>
            ) : null
          ))
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
