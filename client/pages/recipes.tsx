import Filter from "@/components/RecipePage copy/Filter";
import React from "react";

export default function recipes() {
  return (
    <div className="container flex gap-5 p-14 border">
      <div className="w-3/12 border">
        <Filter />
      </div>
      <div className="w-9/12 border">recipes</div>
    </div>
  );
}
