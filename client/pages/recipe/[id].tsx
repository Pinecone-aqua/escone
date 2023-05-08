import PopularSection from "@/components/Home/PopularSection";
import { useRecipe } from "@/context/recipeContext";
import dayjs from "dayjs";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import React from "react";

function Recipe() {
  const { recipe } = useRecipe();
  const date = dayjs(recipe?.created_date).format("MMM DD, YYYY");
  console.log(recipe);
  function rateHandler(rate: number) {
    let result: JSX.Element[] = [];
    let newrate = Math.round(rate);
    for (let i = 5; i > 0; i--) {
      if (newrate != 0) {
        result = [...result, <AiFillStar key={i} />];
        newrate -= 1;
      } else {
        result = [...result, <AiOutlineStar key={i} />];
      }
    }
    return result;
  }
  return (
    recipe && (
      <div className="container ">
        <div className="w-full h-[820px] flex ">
          <picture className="w-[35%] h-full block">
            <img src={recipe.images[0]} alt="" className="w-full h-full" />
          </picture>
          <div className="p-16 w-[70%]">
            <div className="w-full flex flex-col gap-20">
              <div className="w-full flex flex-col gap-3">
                <div className="flex justify-between">
                  <h1 className=" text-primary font-extrabold text-3xl">
                    {recipe.title}
                  </h1>
                  <p className="text-base text-gray-500 italic">{date}</p>
                </div>
                <div className="text-2xl flex text-primary gap-2">
                  {rateHandler(recipe.rate.rating).map((star) => star)}
                  <p className="text-lg">
                    {recipe.rate.rating}/{recipe.rate.vote}
                  </p>
                </div>
                <div className="flex gap-3">
                  {recipe.tags.map((tag, index) => (
                    <div
                      className=" px-3 py-2 bg-primary rounded-full text-xs text-white"
                      key={index}
                    >
                      {tag.name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-[80%] text-primary">
                <p>{recipe.description}</p>
              </div>
              <div className="flex flex-col gap-5">
                <h3 className="text-xl font-semibold text-primary">
                  Ingredients
                </h3>
                <div className="">
                  {recipe.ingredients.map((ing, index) => (
                    <div className="" key={index}>
                      <p className="flex gap-3 text-gray-700">
                        {" "}
                        {ing.quintity}
                        <span className="text-sm">{ing.measure}</span>
                        {ing.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full border bg-[#f5f5f5] flex flex-col justify-center items-center py-[115px]">
          <div className="w-[600px]">
            {" "}
            <h2 className="text-xl text-primary font-semibold  mb-7">Method</h2>
            <div className="flex flex-col gap-5">
              {recipe.method.map((mtd, index) => (
                <div key={index} className="flex flex-col gap-5">
                  <h4 className="text-primary">STEP {Object.keys(mtd)}</h4>
                  <p>{Object.values(mtd)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <PopularSection />
        <div className="">review</div>
      </div>
    )
  );
}

export default Recipe;
