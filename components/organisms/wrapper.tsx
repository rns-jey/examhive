import React from "react";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="container mx-auto p-4 md:p-6 lg:p-8">{children}</div>;
}
