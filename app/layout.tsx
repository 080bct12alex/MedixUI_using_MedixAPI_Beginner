// app/layout.tsx
import "../styles/globals.css";

import RootLayoutClient from "./components/RootLayoutClient";

export const metadata = {
  title: "Medix UI – Patient Management System",
  description: "A patient management system frontend built with Next.js and FastAPI backend integration.",
  icons: {
    icon: "/favicon.ico",
  },
  // add more metadata here if needed
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-800 h-screen">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
