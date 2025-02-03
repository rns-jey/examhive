import currentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    if (profile.role !== "ADMIN") return new NextResponse("Unauthorized", { status: 401 });

    const { title, description } = await req.json();

    const topic = await db.topic.create({
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(topic);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
