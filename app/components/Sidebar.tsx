// app/components/Sidebar.tsx // Sidebar navigation
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useEffect, useState } from "react";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
};

export default function Sidebar({ isOpen, onClose, isLoggedIn }: SidebarProps) {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Dashboard" },
  ];

  if (isLoggedIn) {
    links.push({ href: "/patients", label: "Patients" });
  }

  return (
    <>
      {/* Overlay (mobile only) */}
      <div
        className={clsx(
          "fixed inset-0 z-40 bg-black bg-opacity-40 md:hidden transition-opacity",
          isOpen ? "block" : "hidden"
        )}
        onClick={onClose}
      />

      {/* Sidebar itself */}
      <aside
        className={clsx(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform md:static md:translate-x-0 md:block md:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="flex flex-col p-6 space-y-4">
          <div className="text-lg font-bold text-blue-600 md:hidden mb-4">🏥 Patient Manager</div>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={clsx(
                "text-gray-700 px-3 py-2 rounded hover:bg-blue-100 hover:text-blue-700 transition",
                pathname === link.href && "bg-blue-50 text-blue-700 font-medium"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
