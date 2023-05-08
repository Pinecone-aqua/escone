import { PropType } from "@/utils/types";
import Header from "./Header";
// import Footer from "./Footer";
import Head from "next/head";
import Logo from "@/public/Logo";

export default function Layout({ children }: PropType) {
  return (
    <div
      style={{ fontFamily: "Poltawski Nowy, serif" }}
      className={`min-h-[100vh] w-[100wh] flex flex-col`}
    >
      <Head>
        <title>
          <Logo />
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
}
