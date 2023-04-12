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
        nullifierHash: fullProof.nullifierHash
      });

      alert("Your feedback has been submitted. Thank you!");
    } catch (error) {
      if (error) {
        console.error(error);
        alert("Unexpected error occurred. Please try again later.");
      }
    }
  }

  return (
    <div className="content">
      <h1 className="session-title">{session.name}</h1>
      <p className="session-description">{session.description}</p>

      <p>
        You can leave feedback for the Zuzalu session &rdquo;{session.name}&rdquo; anonymously using the below form.
      </p>
      <p>
        You will be asked to prove you attendance to the event anonymously using the ZuPass before your feedback is
        accepted.
      </p>

      <hr />

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
