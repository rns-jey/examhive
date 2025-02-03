import { SignOutButton } from "@clerk/nextjs";
import React from "react";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SignOutButton />
      {children}
    </div>
  );
}
