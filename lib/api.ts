const BASE_URL = "https://medixapi.onrender.com"; // Change if your backend runs elsewhere

function handleAuthError(res: Response) {
  if (res.status === 401) {
    localStorage.removeItem("token");
    // Use window.location.href for full page reload to ensure Next.js re-evaluates auth state
    window.location.href = "/auth/login"; 
  }
}

// Auth
export async function login(credentials: any) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  handleAuthError(res);
  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();
  localStorage.setItem("token", data.access_token);
  return data;
}

export async function register(credentials: any) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  handleAuthError(res);
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

function getToken() {
    if (typeof window !== 'undefined') {
        return localStorage.getItem("token");
    }
    return null;
}

export async function fetchPatients() {
  const token = getToken();
  const res = await fetch(`${BASE_URL}/patients/view`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  handleAuthError(res);
  if (!res.ok) throw new Error("Failed to fetch patients");
  return res.json();
}

export async function fetchPatient(id: string) {
  const token = getToken();
  const res = await fetch(`${BASE_URL}/patients/patient/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  handleAuthError(res);
  if (!res.ok) throw new Error(`Failed to fetch patient with id ${id}`);
  return res.json();
}

export async function createPatient(data: any) {
    const token = getToken();
  const res = await fetch(`${BASE_URL}/patients/create`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
  handleAuthError(res);
  if (!res.ok) throw new Error("Failed to create patient");
  return res.json();
}

export async function updatePatient(id: string, data: any) {
    const token = getToken();
  const res = await fetch(`${BASE_URL}/patients/edit/${id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
  handleAuthError(res);
  if (!res.ok) throw new Error(`Failed to update patient with id ${id}`);
  return res.json();
}

export async function deletePatient(id: string) {
    const token = getToken();
  const res = await fetch(`${BASE_URL}/patients/delete/${id}`, {
    method: "DELETE",
    headers: {
        Authorization: `Bearer ${token}`
    },
  });
  handleAuthError(res);
  if (!res.ok) throw new Error(`Failed to delete patient with id ${id}`);
  return res.json();
}

export async function sortPatients(sortBy: string, order: string) {
    const token = getToken();
    const res = await fetch(`${BASE_URL}/patients/sort?sort_by=${sortBy}&order=${order}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    handleAuthError(res);
    if (!res.ok) throw new Error("Failed to sort patients");
    return res.json();
}

export async function groupPatientsByDisease() {
    const token = getToken();
    const res = await fetch(`${BASE_URL}/patients/group_by_disease`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    handleAuthError(res);
    if (!res.ok) throw new Error("Failed to group patients by disease");
    return res.json();
}

export async function groupPatientsByCondition() {
    const token = getToken();
    const res = await fetch(`${BASE_URL}/patients/group_by_condition`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    handleAuthError(res);
    if (!res.ok) throw new Error("Failed to group patients by condition");
    return res.json();
}

export async function filterPatients(params: any) {
    const token = getToken();
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/patients/filter?${query}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    handleAuthError(res);
    if (!res.ok) throw new Error("Failed to filter patients");
    return res.json();
}
