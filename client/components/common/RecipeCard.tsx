import { useUser } from "@/context/userContext";
import { RecipeType } from "@/utils/types";
import Link from "next/link";
import { Menu } from "primereact/menu";
import { useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

type PropType = {
  recipe: RecipeType;
  width?: string;
};
export default function RecipeCard({ recipe }: PropType): JSX.Element {
  const { user } = useUser();
  const [save, setSave] = useState(false);
  const saveHandler = () => {
    setSave(!save);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const menu: React.MutableRefObject<any> = useRef(null);
  const items = [
    {
      icon: "pi pi-pencil",
      label: "edit",
      url: `/addRecipe?recipeId=${recipe._id}`,
    },
    {
      icon: "pi pi-trash",
      label: "delete",
      url: ``,
    },
  ];
  return (
    <div className="recipeCard relative group">
      <picture>
        <img src={recipe.images[0]} alt="" />
      </picture>
      <Link href={`/recipe/${recipe._id}`}>
        <div className="text">
          <div className="title">
            <button onClick={saveHandler} className="favorite">
              {save === false ? <MdFavoriteBorder /> : <MdFavorite />}
            </button>
            <h4>{recipe.title.slice(0, 20)}</h4>
          </div>
          <p>{recipe.description.slice(0, 80)}...</p>
          <button className="more">
            read more <span>&#8594;</span>
          </button>
        </div>
      </Link>
      {user && user._id == recipe.created_by._id && (
        <button
          className="p-1 group-hover:block hidden rounded-full bg-slate-50 bg-opacity-50 absolute top-1 right-1 text-2xl text-white hover:bg-opacity-70"
          onClick={(e) => menu.current.toggle(e)}
        >
          <BsThreeDots />
          <Menu model={items} popup ref={menu} className="mt-3" />
        </button>
      )}
    </div>
  );
}
