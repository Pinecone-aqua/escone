import React, { useState } from "react";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";

export default function Categories(): JSX.Element {
  interface CategoryList {
    id: string;
    value: string;
  }

  const categories: CategoryList[] = [
    { id: "salads", value: "Salads" },
    { id: "dinner", value: "Dinner" },
    { id: "healthy", value: "Healthy" },
    { id: "vegan", value: "Vegan" },
    { id: "soups", value: "Soups" },
    { id: "mealprep", value: "Meal Prep" },
  ];

  const [category, setCategory] = useState<string>("");
  return (
    <div className="category-choices">
      {categories.map((cate, index) => (
        <div key={index} className="category-choice">
          <RadioButton
            inputId={cate.id}
            value={cate.value}
            onChange={(e: RadioButtonChangeEvent) => setCategory(e.value)}
            checked={category === cate.value}
          />
          <label htmlFor={cate.id}>{cate.value}</label>
        </div>
      ))}
    </div>
  );
}
