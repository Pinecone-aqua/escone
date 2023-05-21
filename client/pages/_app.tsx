import Layout from "@/components/common/Layout";
import ProfileLayout from "@/components/common/ProfileLayout";
import UserProvider from "@/context/userContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { StrictMode } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  if (pathname.startsWith("/profile")) {
    return (
      <StrictMode>
        <UserProvider>
          <Layout>
            <ProfileLayout>
              <div>
                <Component {...pageProps} />
                <ToastContainer />
              </div>
            </ProfileLayout>
          </Layout>
        </UserProvider>
      </StrictMode>
    );
  }

  return (
    <StrictMode>
      <UserProvider>
        <Layout>
          <div>
            <Component {...pageProps} />
            <ToastContainer />
          </div>
        </Layout>
      </UserProvider>
    </StrictMode>
  );
}
