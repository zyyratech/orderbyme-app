import { useState } from "react";
import ButtonLogout from "../components/ButtonLogout";

export default function MainLayout({ children }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {children}
    </div>
  );
}
