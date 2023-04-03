import Head from "next/head";
import React from "react";
import FeedbackForm from "../../../components/feedback-form";
import { generateProofForFeedback } from "../../../utils/pcd";
import { useRouter } from "next/router";
import { submitFeedback } from "../../../utils/api";

export default function NewFeedbackPage() {
  const router = useRouter();
  const sessionId = router.query.id as string;

  async function onFeedbackSubmit(feedback: string) {
    try {
      // Redirect to PCD and get the proof
      const fullProof = await generateProofForFeedback(feedback, sessionId);

      // Send feedback and proof to API
      await submitFeedback({
        sessionId,
        feedback,
        proof: fullProof.proof,
        nullifierHash: fullProof.nullifierHash,
      })

      alert("Your feedback has been submitted. Thank you!")
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

        <h1>Feedback for {sessionId}</h1>

        <FeedbackForm onSubmit={onFeedbackSubmit} />
      </main>
    </>
  );
}
