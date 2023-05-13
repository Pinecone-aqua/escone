import Head from "next/head";
import Hero from "@/components/home/Hero";
import Popular from "@/components/home/Popular";
import Special from "@/components/home/Special";
import axios from "axios";
import { RecipeType } from "@/utils/types";

export default function Home({ recipes }: { recipes: RecipeType[] }) {
  return (
    <>
      <Head>
        <title key="title">Home | FOODIE</title>
      </Head>

      <Hero />
      <Popular recipes={recipes} />
      <Special />
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
