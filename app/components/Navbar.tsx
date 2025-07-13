//app/components/Navbar.tsx // Top navigation bar

"use client";

type NavbarProps = {
  onToggleSidebar: () => void;
};

export default function Navbar({ onToggleSidebar }: NavbarProps) {
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

      <span className=" text-sm text-gray-600">Welcome, Doctor</span>
    </header>
  );
}
