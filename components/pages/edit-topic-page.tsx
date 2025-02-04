"use client";
import React, { useState } from "react";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useRouter } from "next/navigation";
import { CheckCircle2, Timer, XCircle } from "lucide-react";
import { Button } from "../atoms/button";
import { Progress } from "../ui/progress";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import Wrapper from "../organisms/wrapper";

interface EditTopicPageProps {
  examId: string;
}

const questions = [
  {
    id: 1,
    question: "What does AWS stand for?",
    options: ["Amazon Web Services", "Advanced Web Security", "Automated Web Solutions", "Artificial Web Systems"],
    correctAnswer: "Amazon Web Services",
  },
  {
    id: 2,
    question: "Which pricing model does AWS use?",
    options: ["Flat-rate pricing", "Subscription-based pricing", "Pay-as-you-use", "License-based pricing"],
    correctAnswer: "Pay-as-you-use",
  },
  {
    id: 3,
    question: "What is Amazon EC2 used for?",
    options: ["Cloud storage", "Virtual server hosting", "Database management", "Website development"],
    correctAnswer: "Virtual server hosting",
  },
  {
    id: 4,
    question: "What is the main benefit of cloud computing?",
    options: [
      "Higher electricity usage",
      "Need for large on-premise servers",
      "Scalability and flexibility",
      "Limited storage capacity",
    ],
    correctAnswer: "Scalability and flexibility",
  },
  {
    id: 5,
    question: "Which of the following is NOT an AWS service?",
    options: ["AWS Lambda", "Google Cloud Compute", "Amazon S3", "AWS Ground Station"],
    correctAnswer: "Google Cloud Compute",
  },
  {
    id: 6,
    question: "What is the primary function of the client-server model?",
    options: [
      "A client requests resources and the server responds",
      "Servers generate requests for clients",
      "Both client and server store data locally",
      "Clients provide services to other clients",
    ],
    correctAnswer: "A client requests resources and the server responds",
  },
  {
    id: 7,
    question: "Which of these best describes an on-premises data center?",
    options: [
      "A cloud-based server infrastructure",
      "A location where a company manages its own IT infrastructure",
      "A data center that only operates during business hours",
      "A third-party storage facility for cloud providers",
    ],
    correctAnswer: "A location where a company manages its own IT infrastructure",
  },
  {
    id: 8,
    question: "What is elasticity in cloud computing?",
    options: [
      "The ability to automatically scale resources up or down",
      "The capability to store large amounts of data",
      "A security feature that protects cloud services",
      "A method for speeding up network traffic",
    ],
    correctAnswer: "The ability to automatically scale resources up or down",
  },
  {
    id: 9,
    question: "What AWS service allows businesses to store and manage data?",
    options: ["Amazon S3", "AWS Lambda", "Amazon EC2", "AWS Glue"],
    correctAnswer: "Amazon S3",
  },
  {
    id: 10,
    question: "Which AWS service provides satellite data access?",
    options: ["AWS Ground Station", "Amazon Aurora", "AWS Lambda", "Amazon CloudFront"],
    correctAnswer: "AWS Ground Station",
  },
];

export default function EditTopicPage({ examId }: EditTopicPageProps) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds

  // Timer effect would go here in a real implementation
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTimeLeft((prev) => {
  //       if (prev <= 1) {
  //         clearInterval(timer)
  //         setShowResults(true)
  //         return 0
  //       }
  //       return prev - 1
  //     })
  //   }, 1000)
  //   return () => clearInterval(timer)
  // }, [])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

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

  const progress = ((currentQuestion + 1) / questions.length) * 100;

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
            {questions[currentQuestion].options.map((option) => (
              <div
                key={option}
                className={`flex items-center space-x-2 rounded-lg border p-4 transition-colors ${
                  answers[currentQuestion] === option ? "bg-muted" : ""
                }`}
              >
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className="w-full cursor-pointer">
                  {option}
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
