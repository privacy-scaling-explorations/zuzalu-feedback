import supabase from "@/lib/supabaseClient";
import { Feedback, Session } from "@/types";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getSession } from "../../utils/api";

type Props = {
  feedback: Feedback[];
  session: Session;
};

export default function ViewFeedbackPage({ feedback, session }: Props) {
  const router = useRouter();
  const sessionId = router.query.id as string;

  return (
    <div className="container p-5">
      
      <h1 className="session-title">Feedback for {session.name}</h1>
      <p className="session-description">{session.description}</p>

      <hr />

      {feedback.length === 0 && <p>No feedback has been submitted for this session yet.</p>}

      {feedback.map((f: any) => (
        <div key={f} className="feedback-item">
          <div className="feedback-item-date">{new Date(f.created_at).toLocaleString()}</div>
          <div className="feedback-item-message">{f.message}</div>
        </div>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  if (!params || !params.id) {
    throw new Error("Route parameters have not been defined properly");
  }

  let { data: feedback } = await supabase.from("feedback").select().eq("session_id", params.id);

  if (!feedback) {
    throw new Error("DB data does not exist");
  }

  const session = await getSession(params.id as string);

  return {
    props: {
      feedback: feedback as Feedback[],
      session: session as Session
    }
  };
};
