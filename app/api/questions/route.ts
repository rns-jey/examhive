import currentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    if (profile.role !== "ADMIN") return new NextResponse("Unauthorized", { status: 401 });

    const { question, choices, correctAnswer, examId } = await req.json();

    const questionObj = await db.question.create({
      data: {
        examId,
        question,
        choices,
        correctAnswer,
      },
    });

    return NextResponse.json(questionObj);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
