import { Exam, Question } from "@prisma/client";

export type ExamWithQuestions = Exam & { questions: Question[] };
