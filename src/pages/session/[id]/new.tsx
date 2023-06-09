import React from "react";
import FeedbackForm from "../../../components/feedback-form";
import { generateProofForFeedback } from "../../../utils/pcd";
import { useRouter } from "next/router";
import { getSession, submitFeedback } from "../../../utils/api";
import { GetServerSideProps } from "next";
import { Session } from "../../../types";

export default function NewFeedbackPage(props: { session: Session }) {
  const { session } = props;
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
        nullifierHash: fullProof.claim.nullifierHash
      });

      window.location.replace("/thank-you");
    } catch (error) {
      if (error) {
        console.error(error);
        alert("Unexpected error occurred. Please try again later.");
      }
    }
  }

  return (
    <div className="content">
      <h1 className="title">{session.name}</h1>

      <p className="description">
        What feedback would you like to share anonymously with the event organizers? Please be aware that it is not
        possible to share more than one feedback for the same session.
      </p>

      <FeedbackForm onSubmit={onFeedbackSubmit} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{ session: Session }> = async ({ params }) => {
  const sessionId = params?.id as string;

  if (!sessionId) {
    throw new Error("SessionId not found in page route");
  }

  const data = await getSession(sessionId);

  return {
    props: {
      session: data
    }
  };
};
