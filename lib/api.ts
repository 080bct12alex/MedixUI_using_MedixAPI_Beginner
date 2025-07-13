const BASE_URL = "http://localhost:8000"; // Change if your backend runs elsewhere

export async function fetchPatients() {
  const res = await fetch(`${BASE_URL}/view`);
  if (!res.ok) throw new Error("Failed to fetch patients");
  return res.json();
}

export async function fetchPatient(id: string) {
  const res = await fetch(`${BASE_URL}/patient/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch patient with id ${id}`);
  return res.json();
}

export async function createPatient(data: any) {
  const res = await fetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create patient");
  return res.json();
}

export async function updatePatient(id: string, data: any) {
  const res = await fetch(`${BASE_URL}/edit/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to update patient with id ${id}`);
  return res.json();
}

export async function deletePatient(id: string) {
  const res = await fetch(`${BASE_URL}/delete/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Failed to delete patient with id ${id}`);
  return res.json();
}
