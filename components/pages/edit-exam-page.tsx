"use client";

import { Exam } from "@prisma/client";
import Wrapper from "../organisms/wrapper";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../atoms/button";
import { useModal } from "@/hooks/use-modal-store";

interface EditExamPageProps {
  exam: Exam;
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

export default function EditExamPage({ exam }: EditExamPageProps) {
  const { onOpen } = useModal();

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
                {question.options.map((option, optionI) => (
                  <p key={optionI}>{option}</p>
                ))}

                <Separator className="my-4" />

                {`Correct answer: ${question.correctAnswer}`}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}
