import { ReactNode } from "react";
import Navbar from "./Navbar";

export default function MainLayout({
  children,
  showNavbar = true,
}: {
  children: ReactNode;
  showNavbar?: boolean;
}) {
  return (
    <>
      {showNavbar && <Navbar />}
      <div className={showNavbar ? "pt-20 min-h-screen bg-gray-50" : "min-h-screen bg-gray-50"}>
        {children}
      </div>
    </>
  );
}