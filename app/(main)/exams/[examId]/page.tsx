import ExamPage from "@/components/pages/exam-page";
import currentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Question } from "@prisma/client";
import React from "react";

type tParams = Promise<{ examId: string }>;

export default async function Exam(props: { params: tParams }) {
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

  if (!exam) {
    return (
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </a>
            <a href="#" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    );
  }

  const shuffleQuestions = (questions: Question[]) => {
    const shuffled = [...questions]; // Copy the original array to avoid mutation
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Pick a random index
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }

    return shuffled;
  };

  console.log(shuffleQuestions(exam.questions));

  return <ExamPage questions={shuffleQuestions(exam.questions)} />;
}
