import currentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    if (profile.role !== "ADMIN") return new NextResponse("Unauthorized", { status: 401 });

    const { questions, examId } = await req.json();

    if (!Array.isArray(questions)) {
      return new NextResponse("Invalid input format", { status: 400 });
    }

    const questionObjs = questions.map((question: { question: string; choices: string[]; correctAnswer: string }) => ({
      examId,
      question: question.question,
      choices: question.choices,
      correctAnswer: question.correctAnswer,
    }));

    const result = await db.question.createMany({
      data: questionObjs,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
