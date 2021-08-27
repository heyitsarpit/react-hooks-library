/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/icons/favicon.ico" />
          <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `var e,a;e=document.body.classList,(a=localStorage.getItem("theme"))?e.add(a.replace(/"/g,"")):window.matchMedia("(prefers-color-scheme: dark)").matches?e.add("dark"):e.add("light");`
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
