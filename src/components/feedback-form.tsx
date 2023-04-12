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
          <label className="label" htmlFor="feedback">
            Feedback
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="input"
            rows={100}
            id="feedback"
            name="feedback"
          />
        </div>

        <button
          disabled={feedback.length < 3}
          className={"button is-normal" + (isSubmitting ? " is-loading" : '')}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
