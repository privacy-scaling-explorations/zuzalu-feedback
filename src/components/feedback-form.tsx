import React from "react";

type Props = {
  onSubmit: (feedback: string) => Promise<void>;
};

export default function FeedbackForm(props: Props) {
  async function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const formData = new FormData(form as HTMLFormElement);
    const feedback = formData.get("feedback") as string;

    // Disable the textarea while we're submitting the feedback
    const textarea = form.querySelector("textarea") as HTMLTextAreaElement;
    textarea.disabled = true;

    try {
      await props.onSubmit(feedback);
    } finally {
      textarea.disabled = false;
    }
  }

  return (
    <div>
      <form className="feedback-form" onSubmit={onFormSubmit}>
        <div className="field">
          <label className="label" htmlFor="feedback">
            Feedback
          </label>
          <textarea className="input" rows={100} id="feedback" name="feedback" />
        </div>

        <button className="button is-normal" type="submit">Submit</button>
      </form>
    </div>
  );
}
