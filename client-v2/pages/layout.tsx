import Header from "@/components/Header";
import { PropType } from "@/utils/types";

export default function Layout({ children }: PropType) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
