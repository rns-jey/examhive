import currentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

type tParams = Promise<{ examId: string }>;

export async function PATCH(req: Request, props: { params: tParams }) {
  try {
    const profile = await currentProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const { examId } = await props.params;
    const { isPublished } = await req.json();

    const exam = await db.exam.update({
      where: {
        id: examId,
      },
      data: {
        isPublished,
      },
    });

    return NextResponse.json(exam);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
