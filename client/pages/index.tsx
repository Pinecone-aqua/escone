import Carousel from "@/components/Home/Carousel";
import Introduce from "@/components/Home/Introduce";
import RecipesGrid from "@/components/Home/RecipesGrid";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title key="title">Home | FOODIE</title>
      </Head>

      <Carousel />
      <RecipesGrid />
      <Introduce />
    </>
  );
}
