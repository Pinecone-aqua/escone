import Layout from "@/components/global/Layout";
import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poltawski+Nowy:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Layout>
          <Main />
          <NextScript />
        </Layout>
      </body>
    </Html>
  );
}
