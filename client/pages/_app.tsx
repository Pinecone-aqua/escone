import Layout from "@/components/global/Layout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "@/styles/globals.scss";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import type { AppProps } from "next/app";
import RecipeProvider from "@/context/recipeContext";
import UserProvider from "@/context/userContext";
import ReviewProvider from "@/context/reviewContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecipeProvider>
      <ReviewProvider>
        <UserProvider>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer />
          </Layout>
        </UserProvider>
      </ReviewProvider>
    </RecipeProvider>
  );
}
