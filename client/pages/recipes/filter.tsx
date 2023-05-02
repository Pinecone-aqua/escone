import RecipeCard from "@/components/Home/RecipeCard";
import Filter from "@/components/RecipePage/Filter";
import { RecipeType } from "@/utils/types";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Recipes() {
  const [recipes, setRecipes] = useState<RecipeType[] | undefined>();
  const { asPath, query } = useRouter();
  const [finish, setFinish] = useState<boolean>(false);

  useEffect(() => {
    setRecipes(undefined);
    setFinish(false);
    if (Object.keys(query).length === 0) {
      axios
        .get("http://localhost:3030/recipes/all")
        .then((response) => {
          setRecipes(response.data);
          setFinish(true);
        })
        .catch((error) => console.error(error));
    } else {
      axios.get(`http://localhost:3030${asPath}`).then((res) => {
        setRecipes(res.data);
        setFinish(true);
      });
    }
  }, [asPath, query]);
  return (
    <div className="container  flex gap-5 md:gap-16 py-14 min-h-[100vh] w-full ">
      <div className="hidden lg:block w-3/12 ">
        <Filter />
      </div>
      <div className="lg:w-9/12 w-full flex h-full flex-wrap gap-5 md:gap-y-20  justify-center">
        {finish ? (
          recipes?.length == 0 ? (
            <p>empty</p>
          ) : (
            recipes?.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} className={recipe} />
            ))
          )
        ) : (
          <p>loading</p>
        )}
      </div>
    </div>
  );
}
