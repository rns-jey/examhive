import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs";
import { GraduationCap } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function PublicHeader() {
  return (
    // <div>
    //   <SignedIn>
    //     <SignOutButton />
    //   </SignedIn>

    //   <SignedOut>
    //     <SignInButton />
    //   </SignedOut>
    // </div>
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <GraduationCap className="h-6 w-6" />
          <span className="font-bold text-xl">ExamHub</span>
        </Link>
        <nav className="flex items-center space-x-4">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            Home
          </Link>
          <Link href="/exams" className="text-sm font-medium hover:underline underline-offset-4">
            All Exams
          </Link>
          <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
            Dashboard
          </Link>
          {/* <Button variant="outline">Sign In</Button> */}
        </nav>
      </div>
    </header>
  );
}
