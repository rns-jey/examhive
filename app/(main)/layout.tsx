import AppHeader from "@/components/organisms/app-header";
import React from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppHeader />
      {children}
    </div>
  );
}
