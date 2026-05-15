import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/favicon/icons8-favicon-96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="48x48"
            href="/favicon/icons8-favicon-48.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="24x24"
            href="/favicon/icons8-favicon-24.png"
          />
          <script data-ad-client="YOUR_ADSENSE_CLIENT_ID" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
