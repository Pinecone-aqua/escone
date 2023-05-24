import Head from "next/head";
import axios from "axios";
import { GetServerSideProps } from "next";
import { RecipeType } from "@/utils/types";
import HeroSection from "@/components/home/Hero";
import PopularSection from "@/components/home/Popular";
// import SpecialRecipe from "@/components/home/Special";
import Waitlist from "@/components/home/Waitlist";

interface HomeProps {
  recipes: RecipeType[];
}

export default function Home({ recipes }: HomeProps) {
  return (
    <>
      <Head>
        <title key="title">Home | FOODIE</title>
      </Head>

      <HeroSection />
      <PopularSection recipes={recipes} />
      {/* <SpecialRecipe recipes={recipes} /> */}
      <Waitlist />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_END_URL}/recipe/recipes?status=approve`
    );
    const recipes = response.data;
    return {
      props: { recipes },
    };
  } catch (error) {
    console.error("error fetching recipes: ", error);
    return {
      props: { recipes: [] },
    };
  }
};
