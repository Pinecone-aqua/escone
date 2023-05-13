/* eslint-disable camelcase */
import PopularSection from "@/components/home/Popular";
import dayjs from "dayjs";
import React, { useState } from "react";
import axios from "axios";
import { RecipeType, ReviewType } from "@/utils/types";
import { toast } from "react-toastify";
import { useUser } from "@/context/userContext";

import { ConfirmDialog } from "primereact/confirmdialog";
import Review from "@/components/recipe/Review";
import { dateFormat, starPrinter } from "@/utils/functions";

function Recipe({
  recipe,
  review,
  recipes,
}: {
  recipes: RecipeType[];
  recipe: RecipeType;
  review: ReviewType[];
}) {
  const { user } = useUser();
  const [newRate, setNewRate] = useState(0);
  const [content, setContent] = useState("");

  const rates = review.map((rev) => rev.rate);

  function Avg(array: number[]) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += array[i];
    }
    return sum / array.length;
  }

  function reviewHandler() {
    // eslint-disable-next-line camelcase
    const newReview = {
      created_by: user?._id,
      recipe_id: recipe._id,
      rate: newRate,
      content: content,
      created_date: dayjs().format(),
    };
    console.log(newReview);
    if (newRate === 0) {
      toast.error("You have not rated");
    } else if (content === "") {
      toast.error("You have not written a review");
    } else {
      axios.post("http://localhost:3030/review/create", newReview);
      toast.success("You have written a review");
      setContent("");
      setNewRate(0);
    }
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
                {starPrinter(Avg(rates))}
                <p className="text-lg">
                  {Avg(rates).toFixed(2)}/{rates.length}
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
              <div className="flex flex-wrap gap-2">
                {recipe.ingredients.map((ing, index) => (
                  <div className="  " key={index}>
                    <p className="flex gap-1 text-gray-700 px-3 py-1 border border-green-500 rounded-full">
                      {" "}
                      {ing.quantity}
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
            {recipe.instructions.map((mtd, index) => (
              <div key={index} className="flex flex-col gap-5">
                <h4 className="text-primary">STEP {Object.keys(mtd)}</h4>
                <p>{Object.values(mtd)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PopularSection recipes={recipes} />
      <div className="w-full ">
        <h2 className=" text-primary font-extrabold text-3xl">
          Recipe Reviews
        </h2>
        <ConfirmDialog />
        <div className="w-full">
          {review.map((rev, index) => (
            <Review key={index} review={rev} />
          ))}
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-8">
        <h2 className=" text-primary font-extrabold text-3xl">
          Write a review
        </h2>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-center">
            <p className="text-2xl text-primary font-semibold">Rating</p>
            <p className="text-xl text-primary">{newRate}</p>
            <div className="flex text-2xl text-primary">
              {starPrinter(newRate, (e) => setNewRate(Number(e.target.id)))}
            </div>
          </div>
          <div className="w-full flex flex-col items-end gap-3">
            <textarea
              name="review"
              placeholder="Your review"
              className="w-full border-none  bg-gray-300 rounded-xl p-7"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button
              type="submit"
              onClick={reviewHandler}
              className={
                "py-3 border px-10 text-primary bg-lime-200 border-primary rounded-md"
              }
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
  const resultRecipes = await axios.get(`http://localhost:3030/recipes/all`);
  const recipe = result.data;
  const recipes = resultRecipes.data;
  const review = reviewResult.data;
  return {
    props: { recipe, review, recipes },
  };
}
