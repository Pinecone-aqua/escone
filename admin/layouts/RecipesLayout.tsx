import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { BsFillGrid3X3GapFill, BsTable } from "react-icons/bs";
type PropsType = {
  children: ReactNode;
  grid: boolean;
  setGrid: Dispatch<SetStateAction<boolean>>;
};
export default function RecipesLayout({ children, setGrid, grid }: PropsType) {
  return (
    <div className="w-full flex flex-col gap-5 p-10">
      <div className="w-full text-green-700 p-4 border-b-2 border-green-500 text-2xl flex justify-between">
        <p> Recipes</p>
        <button onClick={() => setGrid(!grid)}>
          {grid ? <BsTable /> : <BsFillGrid3X3GapFill />}
        </button>
      </div>
      <div className="">{children}</div>
    </div>
  );
}
