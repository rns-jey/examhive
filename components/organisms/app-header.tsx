import { SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs";
import { Hexagon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../atoms/button";

export default function AppHeader() {
  return (
    <header className="border-b sticky">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Hexagon className="h-10 w-10 text-amber-500" />
          <span className="font-bold text-xl">Exam Hive</span>
        </Link>
        <nav className="flex items-center ">
          <div className="space-x-4">
            <Link href="/">Home</Link>
            <Link href="/">Exams</Link>

            <SignInButton>
              <SignOutButton />
            </SignInButton>

            <SignedOut>
              <Button asChild className="bg-amber-500 hover:bg-amber-600">
                <SignInButton>Start Practice</SignInButton>
              </Button>
            </SignedOut>
          </div>
        </nav>
      </div>
    </header>
  );
}
