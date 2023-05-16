import Head from "next/head";
import axios from "axios";
import { RecipeType } from "@/utils/types";
import HeroSection from "@/components/home/Hero";
import PopularSection from "@/components/home/Popular";

export default function Home({ recipes }: { recipes: RecipeType[] }) {
  console.log(process.env.BACK_END_URL);
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
  const result = await axios.get(
    `${process.env.BACK_END_URL}/recipe/recipes?status=approve`
  );
  const recipes = result.data;
  return {
    props: { recipes },
  };
}
