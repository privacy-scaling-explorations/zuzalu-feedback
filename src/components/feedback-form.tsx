import React from "react";

type Props = {
  onSubmit: (feedback: string) => Promise<void>;
};

export default function FeedbackForm(props: Props) {
  const [feedback, setFeedback] = React.useState<string>("");
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  async function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    // Disable the textarea while we're submitting the feedback
    const textarea = form.querySelector("textarea") as HTMLTextAreaElement;
    textarea.disabled = true;

    try {
      setIsSubmitting(true);
      await props.onSubmit(feedback);
    } finally {
      textarea.disabled = false;
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <form className="feedback-form" onSubmit={onFormSubmit}>
        <div className="field">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="input"
            placeholder="Type here"
            maxLength={2000}
            rows={300}
            id="feedback"
            name="feedback"
          />
          <p>Max. 2000 characters</p>
        </div>

        <button
          disabled={feedback.length < 3}
          className={"button is-primary" + (isSubmitting ? " is-loading" : "")}
          type="submit"
        >
          SHARE
        </button>
      </form>
    </div>
  );
}
