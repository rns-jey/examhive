import AppHeader from "@/components/organisms/app-header";
import ModalProvider from "@/components/providers/modal-provider";
import ReactQueryProvider from "@/components/providers/react-query-provider";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <div>
        <AppHeader />
        <Toaster />
        <ModalProvider />
        {children}
      </div>
    </ReactQueryProvider>
  );
}
