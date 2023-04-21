import Layout from "@/components/global/Layout";
// import { Html, Head, Main, NextScript } from "next/document";
import { Html, Head, Main, NextScript } from "next/document";
import { GoogleFonts } from "next-google-fonts";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <GoogleFonts href="https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@400;500;600;700;800&display=swap"/>
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
