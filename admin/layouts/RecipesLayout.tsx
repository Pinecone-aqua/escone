import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { BsFillGrid3X3GapFill, BsTable } from "react-icons/bs";
type PropsType = {
  children: ReactNode;
  grid: boolean;
  setGrid: Dispatch<SetStateAction<boolean>>;
};
export default function RecipesLayout({ children, setGrid, grid }: PropsType) {
  return (
    <div>
      <div className="children-head">
        <h2>All Recipes</h2>
        <button onClick={() => setGrid(!grid)}>
          {grid ? <BsTable /> : <BsFillGrid3X3GapFill />}
        </button>
      </div>
      {children}
    </div>
  );
}
