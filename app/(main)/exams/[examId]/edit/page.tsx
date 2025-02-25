import EditExamPage from "@/components/pages/edit-exam-page";
import currentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import React from "react";

type tParams = Promise<{ examId: string }>;

export default async function EditExam(props: { params: tParams }) {
  const profile = await currentProfile();

  if (!profile) return (await auth()).redirectToSignIn;

  const { examId } = await props.params;

  const exam = await db.exam.findUnique({
    where: {
      id: examId,
    },
    include: {
      questions: true,
    },
  });

  if (!exam) return <div>Loading...</div>;

  return <EditExamPage exam={exam} />;
}
