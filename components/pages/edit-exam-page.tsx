"use client";

interface EditTopicPageProps {
  examId: string;
}

export default function EditExamPage({ examId }: EditTopicPageProps) {
  const exam = async () => {
    const response = await fetch(`/api/topic/${examId}`);
    const data = await response.json();

    return data;
  };

  console.log("eXAM", exam());

  return <div>{exam()}</div>;
}
