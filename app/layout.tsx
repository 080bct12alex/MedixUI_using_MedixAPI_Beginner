// app/layout.tsx
"use client";

import { useState, useEffect } from "react";
import "../styles/globals.css";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleLoginStatusChange = () => {
      setIsLoggedIn(localStorage.getItem("token") !== null);
    };

    window.addEventListener('loginStatusChange', handleLoginStatusChange);
    handleLoginStatusChange(); // Initial check

    return () => {
      window.removeEventListener('loginStatusChange', handleLoginStatusChange);
    };
  }, []);

  const handleLoginStatusChange = (status: boolean) => {
    setIsLoggedIn(status);
  };

  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-800 h-screen">
        <div className="flex flex-col h-full">
          <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} isLoggedIn={isLoggedIn} onLoginStatusChange={handleLoginStatusChange} />

          <div className="flex flex-1 overflow-hidden">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} isLoggedIn={isLoggedIn} />

            <main className="flex-1 overflow-y-auto p-4 sm:p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

