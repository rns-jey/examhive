"use client";

import Wrapper from "../organisms/wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "../atoms/button";

export default function HomePage() {
  return (
    <Wrapper>
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="font-bold text-2xl tracking-tight md:text-3xl lg:text-4xl">{`Welcome back, Jhorene!`}</h1>
          <p className="text-muted-foreground">Pick up where you left off or try something new.</p>
        </header>

        <div className="space-y-2">
          <h1 className="font-bold tracking-tight text-lg md:text-xl lg:text-2xl">Continue Learning</h1>
          <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle>Introduction to JavaScript</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Last attempted 2 days ago
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Previous Score: 75%</p>
                  <p className="text-sm text-muted-foreground">30 questions remaining</p>
                </div>
                <Button>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Wrapper>
  );
}
