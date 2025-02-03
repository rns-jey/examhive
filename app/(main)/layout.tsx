import AppHeader from "@/components/organisms/app-header";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppHeader />
      <Toaster />
      {children}
    </div>
  );
}
