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
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error("Error submitting feedback");
    }
  });
}
