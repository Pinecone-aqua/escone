import HeroSection from "@/components/Home/HeroSection";
import PopularSection from "@/components/Home/PopularSection";
import SpecialSection from "@/components/Home/SpecialSection";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title key="title">Home | FOODIE</title>
      </Head>

      <HeroSection />
      <PopularSection />
      <SpecialSection />
    </>
  );
}
