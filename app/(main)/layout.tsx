import PublicHeader from "@/components/organisms/public-header";
import React from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PublicHeader />
      {children}
    </div>
  );
}
