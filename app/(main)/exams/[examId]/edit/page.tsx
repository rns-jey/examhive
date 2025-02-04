import EditTopicPage from "@/components/pages/edit-topic-page";
import currentProfile from "@/lib/current-profile";
import { auth } from "@clerk/nextjs/server";
import React from "react";

interface EditTopicProps {
  params: () => Promise<{ examId: string }>;
}

export default async function EditTopic({ params }: EditTopicProps) {
  const profile = await currentProfile();

  if (!profile) return (await auth()).redirectToSignIn;

  const { examId } = await params();

  return <EditTopicPage examId={examId} />;
}
