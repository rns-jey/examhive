"use client";

import React from "react";
import Wrapper from "../organisms/wrapper";
import { Button } from "../atoms/button";
import { Exam, Profile } from "@prisma/client";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { useModal } from "@/hooks/use-modal-store";

interface ExamsPageProps {
  profile: Profile;
  exams: Exam[];
}

export default function ExamsPage({ exams, profile }: ExamsPageProps) {
  const { onOpen } = useModal();

  return (
    <Wrapper>
      <div className="space-y-8">
        <header className="flex justify-between">
          <div className="space-y-2">
            <h1 className="font-bold text-2xl tracking-tight md:text-3xl lg:text-4xl">Practice Exams</h1>
            <p className="text-muted-foreground">
              Enhance your skills and track your progress, and move closer to success—one practice session at a time!
            </p>
          </div>
          {profile.role === "ADMIN" && <Button onClick={() => onOpen("createExam")}>New Exam</Button>}
        </header>

        <div className="space-x-2">
          <Button className="text-white">All</Button>
          <Button>Topic 1</Button>
          <Button>Topic 2</Button>
          <Button>Topic 3</Button>
        </div>

        <div className="space-y-2">
          <h1 className="font-bold tracking-tight text-lg md:text-xl lg:text-2xl">{`${exams.length} practice tests`}</h1>

          <div className="grid grid-cols-none gap-4 md:grid-cols-2 lg:grid-cols-3">
            {exams.map((exam) => (
              <Card key={exam.id} className="hover:bg-accent/50 transition-colors cursor-pointer flex flex-col">
                <CardHeader className="flex flex-col flex-grow">
                  <CardTitle>{exam.title}</CardTitle>
                  <CardDescription className="mt-auto">{exam.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant={"outline"} className="ml-auto">
                    <Link href={`/exams/${exam.id}`}>Start</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}

            {/* <Dialog>
              <DialogTrigger asChild>
                <Card key="new-exam" className="hover:bg-accent/50 transition-colors cursor-pointer flex flex-col">
                  <CardHeader>
                    <CardTitle>New Exam</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col justify-center items-center">
                    <Plus className="flex-grow h-10" />
                  </CardContent>
                  <CardFooter>
                    <Button variant={"ghost"} className="ml-auto"></Button>
                  </CardFooter>
                </Card>
              </DialogTrigger>
              <NewExamForm />
            </Dialog> */}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
