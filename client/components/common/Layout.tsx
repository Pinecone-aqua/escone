import { PropType } from "@/utils/types";
import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";
import Logo from "@/public/Logo";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useUser } from "@/context/userContext";

export default function Layout({ children }: PropType) {
  const { replace, query } = useRouter();
  const { setToken } = useUser();

  useEffect(() => {
    if (query.token) {
      Cookies.set("token", `${query.token}`);
      replace("/");
      setToken(`${query.token}`);
    }
  }, [query.token, replace, setToken]);
  return (
    <div
      style={{ fontFamily: "Roboto, sans-serif" }}
      className={`w-[100wh] flex flex-col justify-between`}
    >
      <Head>
        <title>
          <Logo />
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
