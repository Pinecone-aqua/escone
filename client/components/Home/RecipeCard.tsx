import { RecipeType } from "@/utils/types";
import Link from "next/link";
import { Divider } from "primereact/divider";
import { FiHeart } from "react-icons/fi";

type PropType = {
  recipe: RecipeType;
  width?: string;
};
export default function RecipeCard({ recipe, width }: PropType): JSX.Element {
  return (
    <div
      className={`min-w-[160px] max-w-[302px] ${
        width ? width : "xl:w-[302px] lg:w-[240px] sm:w-[200px]"
      }  rounded-lg drop-shadow-2xl `}
    >
      <Link href={"/recipe/id"} className="w-full">
        <picture className="w-full">
          <img src={recipe.images[0]} alt="" className="w-full rounded-t-lg " />
        </picture>
      </Link>
      <div className="p-[8px] sm:p-[12px] xl:p-[16px] flex justify-between text-xs sm:text-sm lg:text-md xl:text-xl bg-white rounded-b-lg">
        <Link href={"/recipe/id"}>
          <p>{recipe.title}</p>
        </Link>
        <div className="flex items-center text-lg  sm:text-xl lg:text-2xl">
          <Divider layout="vertical" />
          <FiHeart className="hover:fill-red-600 hover:stroke-red-600" />
        </div>
      </div>
    </div>
  );
}
