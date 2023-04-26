import { RecipeType } from "@/utils/types";

import Link from "next/link";
import { FiHeart } from "react-icons/fi";

type PropType = {
  recipe: RecipeType;
};
export default function RecipeCard({ recipe }: PropType): JSX.Element {
  return (
    <Link href={"/"}>
      <div className="card max-h-[416px]">
        {recipe.images.length > 0 && (
          <picture>
            <img
              className="card-img max-h-[302px]"
              src={recipe.images[0]}
              width={100}
              height={100}
              alt={"recipe-image"}
            />
          </picture>
        )}
        <div className="card-content flex justify-between p-5 shadow-md">
          <div className="card-text max-w-[190px] w-full">
            <h2 className="text-[22px] font-bold">
              {recipe.title.slice(0, 15)}...
            </h2>
            <h5 className="text-[15px] font-light">
              {recipe.description.slice(0, 40)}...
            </h5>
          </div>
          <div className="divider divide-horizontal divide-x-2 divide-black" />
          <div className="like flex items-center p-3">
            <FiHeart className="w-[25px] h-[25px] hover:fill-red-600" />
          </div>
        </div>
      </div>
    </Link>
  );
}
