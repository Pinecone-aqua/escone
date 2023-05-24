import React from "react";
import { Carousel, CarouselResponsiveOption } from "primereact/carousel";
import { FaExternalLinkAlt } from "react-icons/fa";
import { RecipeType } from "@/utils/types";
import RecipeCard from "../common/RecipeCard";
import Link from "next/link";

interface PopularSectionProps {
  recipes: RecipeType[];
}

export default function PopularSection({ recipes }: PopularSectionProps) {
  const recipeTemplate = (recipe: RecipeType) => (
    <RecipeCard key={recipe._id} recipe={recipe} />
  );
  const responsiveOptions: CarouselResponsiveOption[] = [
    {
      breakpoint: "1199px",
      numVisible: 4,
      numScroll: 3,
    },
    {
      breakpoint: "991px",
      numVisible: 3,
      numScroll: 2,
    },
    {
      breakpoint: "767px",
      numVisible: 3,
      numScroll: 2,
    },
    {
      breakpoint: "576px",
      numVisible: 2,
      numScroll: 1,
    },
  ];

  return (
    <div className="popular container">
      <div className="popular-head">
        <h3>Жорын сан</h3>
        <Link href={"/recipes"}>
          <button>
            Бүгдийг харах
            <FaExternalLinkAlt />
          </button>
        </Link>
      </div>
      <Carousel
        value={recipes.slice(0, 9)}
        numVisible={4}
        numScroll={3}
        responsiveOptions={responsiveOptions}
        itemTemplate={recipeTemplate}
      />
    </div>
  );
}
