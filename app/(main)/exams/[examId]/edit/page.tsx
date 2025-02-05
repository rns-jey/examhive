import EditExamPage from "@/components/pages/edit-exam-page";
import currentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import React from "react";

type tParams = Promise<{ examId: string }>;

export default async function EditExam(props: { params: tParams }) {
  const profile = await currentProfile();

  if (!profile) return (await auth()).redirectToSignIn;

  const { examId } = await props.params;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  console.log(`${baseUrl}/api/exam/${examId}`);
  const exam = await axios.get(`${baseUrl}/api/exam/${examId}`);

  return <EditExamPage examId={examId} />;
}
