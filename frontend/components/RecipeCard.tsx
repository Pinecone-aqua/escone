import { FC } from "react";
import { FiHeart } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
// import recipesData from "../utils/dummyRecipes.json";
import placeholder from "@/assets/placeholder.png";


const RecipeCard: FC = () => {
  // console.log("data:", recipesData);
  return (
    <Link href={"/"}>
      <div className="card max-h-[416px]">
        <Image
          className="card-img max-h-[302px]"
          src={placeholder}
          alt={"placeholder"}
        />
        <div className="card-content flex justify-between p-5 shadow-md">
          <div className="card-text max-w-[190px] w-full">
            <h2 className="text-[22px] font-bold">Title...</h2>
            <h5 className="text-[15px] font-light">description area...</h5>
          </div>
          <div className="divider divide-horizontal divide-x-2 divide-black"></div>
          <div className="like flex items-center p-3">
            <FiHeart className="w-[25px] h-[25px] hover:fill-red-600" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;