"use client";

interface EditExamPageProps {
  examId: string;
}

export default function EditExamPage({ examId }: EditExamPageProps) {
  const exam = async () => {
    const response = await fetch(`/api/exam/${examId}`);
    const data = await response.json();

    return data;
  };

  console.log("eXAM", exam());

  return <div>{exam()}</div>;
}
