/* eslint-disable jsx-a11y/alt-text */
import { useRecipe } from "@/context/recipeContext";
import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

export default function Carousel(): null | JSX.Element {
  const { recipes } = useRecipe();
  const specialRecipes = recipes.slice(0, 5);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((currentSlide + 1) % specialRecipes.length);
  };

  const handlePrev = () => {
    setCurrentSlide(
      currentSlide === 0 ? specialRecipes.length - 1 : currentSlide - 1
    );
  };

  return specialRecipes.length != 0 ? (
    <div className="container">
      <div className="carousel">
        <div className="carousel-content">
          <picture>
            <img src={specialRecipes[currentSlide].images[1]} />
          </picture>
          <div className="text">
            <h1>{specialRecipes[currentSlide].title.slice(0, 20)}</h1>
            <p>{specialRecipes[currentSlide].description.slice(0, 130)}...</p>
          </div>
          <div className="gradient" />
        </div>

        <div className="carousel-buttons">
          <button onClick={handlePrev}>
            <FiArrowLeft />
          </button>

          <button onClick={handleNext}>
            <FiArrowRight />
          </button>
        </div>

        <div className="pagination-dots">
          {specialRecipes.map((_image, index) => (
            <button
              key={index}
              className={
                currentSlide === index ? "bg-orange-300" : "bg-gray-300"
              }
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  ) : null;
}
