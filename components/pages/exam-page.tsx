"use client";

import { Button } from "@/components/atoms/button";
import Wrapper from "@/components/organisms/wrapper";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Question } from "@prisma/client";
import { CheckCircle2, Timer, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ExamPageProps {
  questions: Question[];
}

export default function ExamPage({ questions }: ExamPageProps) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowResults(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <Wrapper>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Exam Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center text-2xl font-bold mb-6">
              Your Score: {score} out of {questions.length} ({Math.round((score / questions.length) * 100)}%)
            </div>
            <div className="space-y-4">
              {questions.map((q, index) => (
                <div key={q.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium mb-2">{q.question}</p>
                      <p className="text-sm">Your answer: {answers[index]}</p>
                      <p className="text-sm">Correct answer: {q.correctAnswer}</p>
                    </div>
                    {answers[index] === q.correctAnswer ? (
                      <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button
              onClick={() => {
                setShowResults(false);
                setCurrentQuestion(0);
                setAnswers({});
              }}
              variant="outline"
            >
              Retake Exam
            </Button>
            <Button onClick={() => router.push("/")} className="flex-1">
              Back to Home
            </Button>
          </CardFooter>
        </Card>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle>Question {currentQuestion + 1}</CardTitle>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Timer className="h-4 w-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-lg font-medium">{questions[currentQuestion].question}</div>
          <RadioGroup value={answers[currentQuestion]} onValueChange={handleAnswer}>
            {questions[currentQuestion].choices.map((choice) => (
              <div
                key={choice}
                className={`flex items-center space-x-2 rounded-lg border p-4 transition-colors ${
                  answers[currentQuestion] === choice ? "bg-muted" : ""
                }`}
              >
                <RadioGroupItem value={choice} id={choice} />
                <Label htmlFor={choice} className="w-full cursor-pointer">
                  {choice}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
            Previous
          </Button>
          <Button onClick={handleNext} disabled={!answers[currentQuestion]}>
            {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </Wrapper>
  );
}
