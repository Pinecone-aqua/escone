import React, { useState } from "react";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";

export default function Categories() {
  const [category, setCategory] = useState<string>("");
  return (
    <div className="card flex flex-col gap-2">

      <div className="flex gap-3">
        <div className="flex align-items-center w-full">
          <RadioButton
            inputId="ingredient1"
            name="pizza"
            value="Cheese"
            onChange={(e: RadioButtonChangeEvent) => setCategory(e.value)}
            checked={category === "Cheese"}
          />
          <label htmlFor="ingredient1" className="ml-2">
            Cheese
          </label>
        </div>
        <div className="flex align-items-center">
          <RadioButton
            inputId="ingredient2"
            name="pizza"
            value="Mushroom"
            onChange={(e: RadioButtonChangeEvent) => setCategory(e.value)}
            checked={category === "Mushroom"}
          />
          <label htmlFor="ingredient2" className="ml-2">
            Mushroom
          </label>
        </div>
        <div className="flex align-items-center">
          <RadioButton
            inputId="ingredient3"
            name="pizza"
            value="Pepper"
            onChange={(e: RadioButtonChangeEvent) => setCategory(e.value)}
            checked={category === "Pepper"}
          />
          <label htmlFor="ingredient3" className="ml-2">
            Pepper
          </label>
        </div>
        <div className="flex align-items-center">
          <RadioButton
            inputId="ingredient4"
            name="pizza"
            value="Onion"
            onChange={(e: RadioButtonChangeEvent) => setCategory(e.value)}
            checked={category === "Onion"}
          />
          <label htmlFor="ingredient4" className="ml-2">
            Onion
          </label>
        </div>
      </div>
    </div>
  );
}
