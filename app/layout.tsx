// app/layout.tsx
"use client";

import { useState } from "react";
import "../styles/globals.css";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-800 h-screen">
        <div className="flex flex-col h-full">
          <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

          <div className="flex flex-1 overflow-hidden">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="flex-1 overflow-y-auto p-4 sm:p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

