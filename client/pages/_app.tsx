import Layout from "@/components/common/Layout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "@/styles/globals.scss";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import type { AppProps } from "next/app";
import UserProvider from "@/context/userContext";
import ProfileLayout from "@/components/common/ProfileLayout";
export default function App({ Component, pageProps, router }: AppProps) {
  if (router.pathname.startsWith("/profile")) {
    return (
      <UserProvider>
        <Layout>
          <ProfileLayout>
            <Component {...pageProps} />
            <ToastContainer />
          </ProfileLayout>
        </Layout>
      </UserProvider>
    );
  }
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </UserProvider>
  );
}
