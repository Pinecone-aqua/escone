import PopularSection from "@/components/Home/PopularSection";
import dayjs from "dayjs";
import {
  AiOutlineStar,
  AiFillStar,
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";
import React, { useRef, useState } from "react";
import axios from "axios";
import { RecipeType, ReviewType } from "@/utils/types";

function Recipe({
  recipe,
  review,
}: {
  recipe: RecipeType;
  review: ReviewType[];
}) {
  const [newRate, setNewRate] = useState(0);
  const reviewRef = useRef("");
  function dateFormat(date: Date) {
    const newdate = dayjs(date).format("MMM DD, YYYY");
    return newdate;
  }
  function starPrinter(
    rate: number,
    handler?: React.MouseEventHandler<HTMLDivElement> | undefined
  ) {
    let result: JSX.Element[] = [];
    let newrate = Math.round(rate);
    for (let i = 1; i <= 5; i++) {
      if (newrate != 0) {
        result = [
          ...result,
          <div className="" id={`${i}`} key={i} onClick={handler}>
            <AiFillStar id={`${i}`} />
          </div>,
        ];
        newrate -= 1;
      } else {
        result = [
          ...result,
          <div className="" id={`${i}`} key={i} onClick={handler}>
            <AiOutlineStar id={`${i}`} />
          </div>,
        ];
      }
    }
    return result;
  }
  return (
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
                <p className="text-base text-gray-500 italic">
                  {dateFormat(recipe.created_date)}
                </p>
              </div>
              <div className="text-2xl flex text-primary gap-2">
                {starPrinter(recipe.rate.rating).map((star) => star)}
                <p className="text-lg">
                  {recipe.rate.rating}/{recipe.rate.vote}
                </p>
              </div>
              <div className="flex gap-3">
                {recipe.tags.map((tag, index) => (
                  <div
                    className=" px-3 py-1 text-center bg-primary rounded-full text-xs text-white flex items-center justify-center"
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
      <div className="w-full ">
        <h2 className=" text-primary font-extrabold text-3xl">
          Recipe Reviews
        </h2>
        <div className="">
          {review.map((rev, index) => (
            <div
              key={index}
              className="flex gap-10 py-10 w-full border-b-2 border-gray-300 "
            >
              <picture className="block w-[60px]">
                <img
                  src={rev.created_by.image}
                  alt=""
                  className="w-full rounded-full"
                />
              </picture>
              <div className="w-full flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-semibold text-primary">
                      {rev.created_by.username}
                    </p>
                    <p className="font-semibold text-gray-400">
                      {dateFormat(rev.created_date)}
                    </p>
                  </div>
                  <div className="flex text-2xl text-primary">
                    {starPrinter(rev.rate)}
                  </div>
                </div>
                <div className="w-full ">
                  <p>{rev.content}</p>
                </div>
                <div className="flex text-3xl gap-10">
                  <div className="flex gap-2 items-center">
                    <AiOutlineLike color="green" />
                    <span className="text-2xl">10</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <AiOutlineDislike color="red" />
                    <span className="text-2xl">10</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <h2 className=" text-primary font-extrabold text-3xl">
          Write a review
        </h2>
        <div className="">
          <div className="flex gap-3">
            <p>Rating</p>
            <p>{newRate}</p>
            <div className="flex text-2xl text-primary">
              {starPrinter(newRate, (e) => setNewRate(Number(e.target.id)))}
            </div>
          </div>
          <div className="w-full">
            <input
              name="review"
              className="w-full border border-black"
              onChange={(e) => (reviewRef.current = e.target.value)}
            />
            <button
              type="submit"
              onClick={() => console.log(reviewRef.current, newRate)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipe;

export async function getStaticPaths() {
  const result = await axios.get("http://localhost:3030/recipes/all");
  const recipes = result.data;
  const paths = recipes.map((recipe: RecipeType) => ({
    params: { id: recipe._id },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: { params: { id: string } }) {
  const id = context.params.id;
  const result = await axios.get(`http://localhost:3030/recipes/${id}`);
  const reviewResult = await axios.get(
    `http://localhost:3030/review/recipe/${id}`
  );
  const recipe = result.data;
  const review = reviewResult.data;
  return {
    props: { recipe, review },
  };
}
