"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('token') !== null);
  }, []);

  return (
    <div className="max-w-2xl mx-auto text-center mt-20">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">🏥 Patient Management System</h1>
      <p className="text-lg text-gray-600 mb-6">
        Manage patients efficiently with <span className="font-semibold">FastAPI</span> +{" "}
        <span className="font-semibold">Next.js</span>
      </p>
      {isLoggedIn ? (
        <Link
          href="/patients"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
        >
          View Patients
        </Link>
      ) : (
        <Link
          href="/auth/login"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
        >
          Login
        </Link>
      )}
    </div>
  );
}
