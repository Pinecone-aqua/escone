import { RecipeType } from "@/utils/types";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";

export default function Recipe({ recipe }: RecipeProps) {
  return (
    <>
      <div>
        <div>ID: {recipe._id}</div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`http://localhost:3000/recipes/:id`);
  const resJson = await res.json();
  const paths = resJson.map((id: { _id: string }) => {
    params: {
      id: id._id;
    }
  });
  return { paths, fallback: "blocking" };
};

interface RecipeProps {
  recipe: RecipeType;
}

export const getStaticProps: GetStaticProps<RecipeProps> = async ({
  params,
}: GetStaticPropsContext) => {
  if (!params?.id) {
    return {
      notFound: true,
    };
  }
  const res = await fetch(`http://localhost:3000/recipes/${params.id}`);
  const recipe = await res.json();
  return { props: { recipe } };
};
