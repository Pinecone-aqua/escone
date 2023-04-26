/* eslint-disable jsx-a11y/alt-text */
import { RecipeType } from "@/utils/types";
import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

type PropType = { recipes: RecipeType[] };

export default function Carousel({ recipes }: PropType): null | JSX.Element {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((currentSlide + 1) % recipes.length);
  };

  const handlePrev = () => {
    setCurrentSlide(currentSlide === 0 ? recipes.length - 1 : currentSlide - 1);
  };

  return recipes.length != 0 ? (
    <div className="w-full h-[600px] bg-[#FFFCF6] pb-10">
      <div className="relative w-full h-full container">
        <div className="absolute flex items-center w-full h-full justify-around">
          <picture className="w-96">
            <img
              src={recipes[currentSlide].images[1]}
              className="h-full w-full "
            />
          </picture>

          <div className=" flex flex-col gap-10">
            <h1 className="text-3xl font-bold">
              {recipes[currentSlide].title}
            </h1>
            <p className="w-96">{recipes[currentSlide].description}</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full flex justify-center">
          {recipes.map((_image, index) => (
            <button
              key={index}
              className={`${
                currentSlide === index
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 text-gray-900"
              } w-4 h-4 rounded-full mx-2 `}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-0 bg-[#F06101] p-2 rounded-full text-3xl text-white font-bold"
        >
          <FiArrowLeft />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-0 bg-[#F06101] p-2 rounded-full text-3xl text-white font-bold"
        >
          <FiArrowRight />
        </button>
      </div>
    </div>
  ) : null;
}
