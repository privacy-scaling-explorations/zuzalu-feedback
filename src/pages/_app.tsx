import "@/styles/main.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Inconsolata } from "next/font/google";

const font = Inconsolata({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Zuzalu Feedback</title>

        <meta name="application-name" content="Zuzalu Feedback" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Zuzalu Feedback" />
        <meta name="description" content="An app to allow Zuzalu attendees to send anonymous feedback." />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#1c2928" />

        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Zuzalu Feedback" />
        <meta property="og:description" content="An app to allow Zuzalu attendees to send anonymous feedback." />
        <meta property="og:site_name" content="Zuzalu Feedback" />
        <meta property="og:url" content="https://zuzalu-feedback.appliedzkp.org" />

        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <main className={font.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
