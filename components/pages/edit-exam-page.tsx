"use client";

import Wrapper from "../organisms/wrapper";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../atoms/button";
import { useModal } from "@/hooks/use-modal-store";
import { ExamWithQuestions } from "@/types";
import { Badge } from "../ui/badge";

interface EditExamPageProps {
  exam: ExamWithQuestions;
}

export default function EditExamPage({ exam }: EditExamPageProps) {
  const { onOpen } = useModal();

  const questions = exam.questions;

  return (
    <Wrapper>
      <div className="space-y-8">
        <header className="flex justify-between">
          <div className="space-y-2">
            <h1 className="font-bold text-2xl tracking-tight md:text-3xl lg:text-4xl">{exam.title}</h1>
            <p className="text-muted-foreground">{exam.description}</p>
          </div>

          <Button onClick={() => onOpen("createQuestion", { exam })}>New Question</Button>
        </header>

        <div className="m-auto space-y-4 max-w-5xl">
          {questions.map((question) => (
            <Card key={question.id}>
              <CardHeader className="py-4 font-bold">{question.question}</CardHeader>
              <CardContent className="py-4 pt-0">
                {question.choices.map((choice, optionI) => (
                  <p key={optionI}>{choice}</p>
                ))}

                <Separator className="my-4" />

                <div className="flex items-center gap-2">
                  <span className="font-medium">Correct Answer:</span>
                  <Badge variant="secondary">{question.correctAnswer}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}
