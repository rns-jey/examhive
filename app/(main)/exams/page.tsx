import ExamsPage from "@/components/pages/exams-page";
import currentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import React from "react";

export default async function Exams() {
  const profile = await currentProfile();

  if (!profile) return (await auth()).redirectToSignIn;

  const exams = await db.exam.findMany();

  return <ExamsPage exams={exams} profile={profile} />;
}
