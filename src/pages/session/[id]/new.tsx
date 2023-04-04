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
        nullifierHash: fullProof.nullifierHash
      });

      alert("Your feedback has been submitted. Thank you!");
    } catch (error) {
      console.error(error);
      alert("Unexpected error occurred. Please try again later.");
    }
  }

  return (
    <div className="content">
      <h1 className="title">Feedback for {sessionId?.slice(0, 4)}</h1>

      <p>
        You can leave feedback for the event {sessionId} anonymously using the below form. 
      </p>
      <p>
        You will be asked to prove you attendance to the event anonymously using the ZuPass before your feedback is accepted.
      </p>

      <hr />

      <FeedbackForm onSubmit={onFeedbackSubmit} />
    </div>
  );
}
