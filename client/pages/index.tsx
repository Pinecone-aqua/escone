import Head from "next/head";
import Hero from "@/components/home/Hero";
import Popular from "@/components/home/Popular";
import Special from "@/components/home/Special";

export default function Home() {
  return (
    <>
      <Head>
        <title key="title">Home | FOODIE</title>
      </Head>

      <Hero />
      <Popular />
      <Special />
    </>
  );
}
