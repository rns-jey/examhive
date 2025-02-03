import React from "react";
import { Button } from "../atoms/button";

export default function HeroSection() {
  return (
    <section className="flex flex-col py-12 md:py-24 lg:py-32 justify-center items-center space-y-4 bg-amber-50">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-3xl lg:text-5xl font-bold tracking-tighter">Master Any Topic Through Practice</h1>
        <p>Join Exam Hive and unlock your potential with our comprehensive practice platform.</p>
      </div>
      <div className="flex flex-col gap-2 min-[400px]:flex-row ">
        <Button className="bg-amber-500 hover:bg-amber-600">Get Started</Button>
        <Button variant="outline">Learn More</Button>
      </div>
    </section>
  );
}
