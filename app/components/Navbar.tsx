//app/components/Navbar.tsx // Top navigation bar

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type NavbarProps = {
  onToggleSidebar: () => void;
  isLoggedIn: boolean;
  onLoginStatusChange: (status: boolean) => void;
};

export default function Navbar({ onToggleSidebar, isLoggedIn, onLoginStatusChange }: NavbarProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLoginStatusChange(false);
    window.dispatchEvent(new Event('loginStatusChange'));
    router.push("/auth/login");
  };

  const handleLogin = () => {
    router.push("/auth/login");
  };

  return (
    <header className="h-16 bg-white border-b shadow-sm flex items-center px-4 sm:px-6 justify-between">
      {/* Left: Hamburger + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden"
          aria-label="Open sidebar"
        >
          <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <h1 className="text-xl font-bold text-blue-600 whitespace-nowrap">🏥 Patient Manager</h1>
      </div>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <button onClick={handleLogout} className="text-red-500 hover:underline">
            Logout
          </button>
        ) : (
          <button onClick={handleLogin} className="text-blue-600 hover:underline">
            Login
          </button>
        )}
      </div>
    </header>
  );
}
