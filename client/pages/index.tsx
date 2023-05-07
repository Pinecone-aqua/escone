import Carousel from "@/components/Home/Carousel";
import HeroSection from "@/components/Home/HeroSection";
import Introduce from "@/components/Home/Introduce";
import PopularSection from "@/components/Home/PopularSection";
import RecipesGrid from "@/components/Home/RecipesGrid";
import SpecialRecipe from "@/components/Home/SpecialRecipe";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title key="title">Home | FOODIE</title>
      </Head>

      <HeroSection />
      <PopularSection />
      <SpecialRecipe />
      <Introduce />
    </>
  );
}
