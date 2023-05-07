import "@/styles/globals.scss";
import "primeicons/primeicons.css";
import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";
import Layout from "@/pages/layout";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer />
    </Layout>
  );
}
