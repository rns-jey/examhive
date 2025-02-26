import Wrapper from "../organisms/wrapper";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "../atoms/button";
import currentProfile from "@/lib/current-profile";
import Link from "next/link";

const examsTaken = [
  {
    id: 1,
    name: "Fundamentals of Artificial Intelligence",
    description: "Covers AI concepts, applications, ethics, and machine learning basics.",
    previous_grade: 85,
  },
  {
    id: 2,
    name: "Advanced JavaScript",
    description: "Focuses on ES6+, performance optimization, asynchronous programming, and best practices.",
    previous_grade: 92,
  },
  {
    id: 3,
    name: "Cryptocurrency and Blockchain",
    description: "Explores blockchain technology, cryptocurrency security, trading, and smart contracts.",
    previous_grade: 78,
  },
  {
    id: 4,
    name: "Portuguese Language Proficiency Test",
    description: "Tests grammar, vocabulary, sentence structure, and conversational fluency in Portuguese.",
    previous_grade: 88,
  },
  {
    id: 5,
    name: "AWS Cloud Certification Exam",
    description: "Assesses knowledge in AWS compute, storage, security, and cloud architecture.",
    previous_grade: 74,
  },
];

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
];

export default async function HomePage() {
  const currentUser = await currentProfile();

  return (
    <Wrapper>
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="font-bold text-2xl tracking-tight md:text-3xl lg:text-4xl">{`Welcome back, ${currentUser?.firstName}!`}</h1>
          <p className="text-muted-foreground">Pick up where you left off or try something new.</p>
        </header>

        <div className="space-y-2">
          <h1 className="font-bold tracking-tight text-lg md:text-xl lg:text-2xl">Continue Learning</h1>
          <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle>AWS Cloud Practitioner Essentials</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Last attempted 2 days ago
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Previous Score: 75%</p>
                  <p className="text-sm text-muted-foreground">5 questions remaining</p>
                </div>
                <Link href="/exams/aef8fbb9-0fed-4788-8c17-6b7c8679ba68">
                  <Button asChild>
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          <h1 className="font-bold tracking-tight text-lg md:text-xl lg:text-2xl">Exams Taken</h1>

          {examsTaken.map((exam) => (
            <Card key={exam.id} className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <div className="space-y-1">
                    <CardTitle>{exam.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">{exam.description}</CardDescription>
                  </div>
                  <Button variant={"outline"}>Retake</Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="space-y-2">
          <h1 className="font-bold tracking-tight text-lg md:text-xl lg:text-2xl">Recommended for you</h1>

          <div className="flex flex-col space-x-2 md:flex-row">
            {otherExams.map((exam) => (
              <Card
                key={exam.id}
                className="hover:bg-accent/50 transition-colors cursor-pointer md:w-1/3 flex flex-col"
              >
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
