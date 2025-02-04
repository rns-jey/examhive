import EditTopicPage from "@/components/pages/edit-topic-page";
import currentProfile from "@/lib/current-profile";
import { auth } from "@clerk/nextjs/server";
import React from "react";

type tParams = Promise<{ examId: string }>;

export default async function EditTopic(props: { params: tParams }) {
  const profile = await currentProfile();

  if (!profile) return (await auth()).redirectToSignIn;

  const { examId } = await props.params;

  return <EditTopicPage examId={examId} />;
}
