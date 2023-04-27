import { PropType } from "@/utils/types";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: PropType) {
  return (
    <div
      style={{ fontFamily: "Poltawski Nowy, serif" }}
      className={`min-h-[100vh] w-[100wh] flex flex-col justify-between`}
    >
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
