"use client";
import React from "react";
import Wrapper from "../organisms/wrapper";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface EditTopicPageProps {
  examId: string;
}

export default function EditTopicPage({ examId }: EditTopicPageProps) {
  const { data } = useQuery({
    queryKey: ["tradingCoin"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/topic/${examId}`, {
        // Use `params` for query parameters
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": process.env.COINGECKO_API_KEY, // Use an environment variable for the API key
        },
      });

      return data;
    },
    refetchInterval: 60000, // every minute
  });

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="font-bold text-2xl tracking-tight md:text-3xl lg:text-4xl">{`${data.title}!`}</h1>
          <p className="text-muted-foreground">{data.description}</p>
        </header>
      </div>
    </Wrapper>
  );
}
