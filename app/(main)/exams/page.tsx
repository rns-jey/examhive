import { Button } from "@/components/atoms/button";
import Wrapper from "@/components/organisms/wrapper";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const otherExams = [
  {
    id: 1,
    name: "Machine Learning Fundamentals",
    description: "Learn about supervised and unsupervised learning, neural networks, and real-world AI applications.",
  },
  {
    id: 2,
    name: "JavaScript Design Patterns",
    description:
      "Understand common design patterns like Singleton, Factory, and Observer to improve code scalability and maintainability.",
  },
  {
    id: 3,
    name: "Smart Contract Security in Blockchain",
    description:
      "Explore vulnerabilities in smart contracts, best practices for secure coding, and auditing techniques.",
  },
  {
    id: 4,
    name: "Fundamentals of Artificial Intelligence",
    description: "Covers AI concepts, applications, ethics, and machine learning basics.",
  },
  {
    id: 5,
    name: "Advanced JavaScript",
    description: "Focuses on ES6+, performance optimization, asynchronous programming, and best practices.",
  },
  {
    id: 6,
    name: "Cryptocurrency and Blockchain",
    description: "Explores blockchain technology, cryptocurrency security, trading, and smart contracts.",
  },
  {
    id: 7,
    name: "Portuguese Language Proficiency Test",
    description: "Tests grammar, vocabulary, sentence structure, and conversational fluency in Portuguese.",
  },
  {
    id: 8,
    name: "AWS Cloud Certification Exam",
    description: "Assesses knowledge in AWS compute, storage, security, and cloud architecture.",
  },
];

export default function Exams() {
  return (
    <Wrapper>
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="font-bold text-2xl tracking-tight md:text-3xl lg:text-4xl">Practice Exams</h1>
          <p className="text-muted-foreground">
            Enhance your skills and track your progress, and move closer to success—one practice session at a time!
          </p>
        </header>

        <div className="space-x-2">
          <Button className="text-white">All</Button>
          <Button>Topic 1</Button>
          <Button>Topic 2</Button>
          <Button>Topic 3</Button>
        </div>

        <div className="space-y-2">
          <h1 className="font-bold tracking-tight text-lg md:text-xl lg:text-2xl">8 practice tests</h1>

          <div className="grid grid-cols-none gap-4 md:grid-cols-2 lg:grid-cols-3">
            {otherExams.map((exam) => (
              <Card key={exam.id} className="hover:bg-accent/50 transition-colors cursor-pointer flex flex-col">
                <CardHeader className="flex flex-col flex-grow">
                  <CardTitle>{exam.name}</CardTitle>
                  <CardDescription className="mt-auto">{exam.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant={"outline"} className="ml-auto">
                    Start
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
