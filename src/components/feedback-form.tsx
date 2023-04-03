import React  from "react";

type Props = {
  session: {
    id: string;
    title: string;
  };
  onSubmit: (feedback: string) => void;
};

export default function FeedbackForm(props: Props) {
  const { session } = props;

  function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    const feedback = formData.get("feedback") as string;

    props.onSubmit(feedback);
  }

  return (
    <div>
      <h1>Feedback for {session.title}</h1>

      <form className="feedback-form" onSubmit={onFormSubmit}>
        <div className="field">
          <label className="label" htmlFor="feedback">
            Feedback
          </label>
          <textarea className="input" rows={100} id="feedback" name="feedback" />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
