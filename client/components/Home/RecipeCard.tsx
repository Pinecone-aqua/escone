import { RecipeType } from "@/utils/types";

import Link from "next/link";
import { FiHeart } from "react-icons/fi";

type PropType = {
  recipe: RecipeType;
  className?: RecipeType;
};
export default function RecipeCard({ recipe }: PropType): JSX.Element {
  return (
    <Link href={"/"} className={`w-5/12 sm:w-[29%] h-[342px]  max-w-[302px]`}>
      <div className="rounded-2xl bg-white h-full w-full ">
        {recipe.images.length > 0 && (
          <picture>
            <img
              className="w-full max-h-[300px] rounded-t-2xl"
              src={recipe.images[0]}
              width={100}
              height={100}
              alt={"recipe-image"}
            />
          </picture>
        )}
        <div className="w-full rounded-b-2xl bg-white   flex justify-between p-2 md:p-5 shadow-md">
          <div className="  w-full">
            <h2 className="text-xs md:text-sm font-bold">
              {recipe.title && recipe.title.slice(0, 15)}...
            </h2>
            <h5 className="text-[8px] sm:text-sm font-light">
              {recipe.description && recipe.description.slice(0, 40)}...
            </h5>
          </div>
          <div className="border border-black" />
          <div className=" flex items-center p-3">
            <FiHeart className="border-none hover:fill-red-600" />
          </div>
        </div>
      </div>
    </Link>
  );
}
