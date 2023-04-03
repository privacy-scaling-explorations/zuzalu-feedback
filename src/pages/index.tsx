import Head from "next/head";
import FeedbackForm from "../components/feedback-form";
import React from "react";
import { generateProofForFeedback } from "../utils/pcd";

export default function Home() {
  const mockSession = {
    id: "123",
    title: "Applications of zkSnarks"
  };

  async function onFeedbackSubmit(feedback: string) {
    try {
      const proof = await generateProofForFeedback(feedback, mockSession.id);

      console.log(proof);
    } catch (error) {
      console.error(error);
      alert("Unexpected error occurred. Please try again later.");
    }
  }

  return (
    <>
      <Head>
        <title>Zuzalu Feedback</title>
        <meta name="description" content="Anonymous feedback app for Zuzalu.city" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <div>Zuzalu Feedback</div>

        <FeedbackForm session={mockSession} onSubmit={onFeedbackSubmit} />
      </main>
    </>
  );
}
