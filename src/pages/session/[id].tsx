import supabase from "@/lib/supabaseClient";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

export default function Session({ feedback }: any) {
  const router = useRouter();
  const sessionId = router.query.id as string;

  return (
    <div className="container mt-5">
      <h1 className="title">Feedback for {sessionId}</h1>

      {feedback.length === 0 && <p>No feedback has been submitted for this session yet.</p>}

      {feedback.map((f: any) => (
        <div key={f} className="feedback-item">
          <div className="feedback-item-date">{new Date().toLocaleDateString("en-US")}</div>
          <div className="feedback-item-message">{f.message}</div>
        </div>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{ feedback: any[] }> = async ({ params }) => {
  if (!params || !params.id) {
    throw new Error("Route parameters have not been defined properly");
  }

  let { data } = await supabase.from("feedback").select().eq("session_id", params?.id);

  if (!data) {
    throw new Error("DB data does not exist");
  }

  return {
    props: {
      feedback: data ?? []
    }
  };
};
