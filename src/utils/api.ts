import { Session } from "../types";

export function submitFeedback(params: {
  sessionId: string;
  feedback: string;
  nullifierHash: string;
  proof: string[];
}) {
  const { sessionId, feedback, nullifierHash, proof } = params;

  return fetch("/api/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ sessionId, feedback, nullifierHash, proof })
  }).then((res) => {
    if (res.status === 201) {
      return res.json();
    } else {
      throw new Error("Error submitting feedback");
    }
  });
}

export function getSession(sessionId: string) : Promise<Session> {
  return fetch(`${process.env.NEXT_PUBLIC_ZUZALU_API}public/sessions/${sessionId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then((res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error("Error fetching session with ID " + sessionId);
    }
  });
}