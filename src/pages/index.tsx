import Image from "next/image";

export default function Home() {
  return (
    <div className="content">
      <div className="is-flex is-align-items-center">
        <Image alt="Zuzalu icon" width={60} height={60} src="./icon.svg" />
        <h1 className="title ml-4">Zuzalu Feedback</h1>
      </div>

      <p className="description">
        This is a web app for Zuzalu attendees to anonymously submit feedback on their experience at the event. If you
        are an attendee, you can find options to submit feedback for each session on the Zuzalu website.
      </p>

      <a className="button is-primary" target="_blank" href="https://zuzalu.city">
        VISIT ZUZALU
      </a>
    </div>
  );
}
