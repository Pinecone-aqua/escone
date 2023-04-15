import { PropType } from "@/utils/types";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: PropType) {
  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
