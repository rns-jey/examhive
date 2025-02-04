import EditTopicPage from "@/components/pages/edit-topic-page";
import currentProfile from "@/lib/current-profile";
import { auth } from "@clerk/nextjs/server";
import React from "react";

export default async function EditTopic({ params }: { params: { examId: string } }) {
  const profile = await currentProfile();

  if (!profile) return (await auth()).redirectToSignIn;

  return <EditTopicPage examId={params.examId} />;
}
