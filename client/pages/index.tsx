import Head from "next/head";
import axios from "axios";
import { RecipeType } from "@/utils/types";
import HeroSection from "@/components/Home/Hero";
import PopularSection from "@/components/Home/Popular";

export default function Home({ recipes }: { recipes: RecipeType[] }) {
  return (
    <>
      <Head>
        <title key="title">Home | FOODIE</title>
      </Head>

      <HeroSection />
      <PopularSection recipes={recipes} />
      {/* <Special /> */}
    </>
  );
}

export async function getServerSideProps() {
  const result = await axios.get(`http://localhost:3030/recipes/all`);
  const recipes = result.data;
  return {
    props: { recipes },
  };
}
