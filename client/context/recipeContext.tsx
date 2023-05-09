import { PropType, recipeContextType, RecipeType } from "@/utils/types";
import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const recipeContext = createContext<recipeContextType>({} as recipeContextType);

export const useRecipe = () => useContext(recipeContext);

export default function RecipeProvider({ children }: PropType) {
  const { asPath, query } = useRouter();
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [finish, setFinish] = useState<boolean>(false);
  useEffect(() => {
    setFinish(false);
    if (Object.keys(query).length != 0) {
      if (query.id) {
      } else {
        axios.get(`http://localhost:3030${asPath}`).then((res) => {
          setRecipes(res.data);
          setFinish(true);
        });
      }
    } else {
      axios
        .get("http://localhost:3030/recipes/all")
        .then((res) => {
          setRecipes(res.data);
          setFinish(true);
        })
        .catch((error) => {
          console.error(error);
          setFinish(true);
        });
    }
  }, [asPath, query]);
  return (
    <recipeContext.Provider value={{ recipes, setRecipes, finish, setFinish }}>
      {children}
    </recipeContext.Provider>
  );
}
