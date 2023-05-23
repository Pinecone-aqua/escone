import { useRouter } from "next/router";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { BsFillGrid3X3GapFill, BsTable } from "react-icons/bs";
type PropsType = {
  children: ReactNode;
  grid: boolean;
  setGrid: Dispatch<SetStateAction<boolean>>;
};
export default function RecipesLayout({ children, setGrid, grid }: PropsType) {
  const router = useRouter();
  return (
    <div>
      <div className="children-head">
        <h2>All Recipes</h2>
        <label className="flex gap-2 items-center">
          <p>Төлөв: </p>
          <select
            value={router.query.status}
            className={`border rounded-lg text-xl p-2`}
            onChange={(e) => {
              if (e.target.value != "any") {
                router.push({
                  query: { ...router.query, status: e.target.value },
                });
              } else {
                delete router.query.status;
                router.push({
                  query: { ...router.query },
                });
              }
            }}
          >
            <option value="any">any</option>
            <option value="pending">pending</option>
            <option value="approve">approve</option>
            <option value="deny">deny</option>
          </select>
        </label>

        <button onClick={() => setGrid(!grid)}>
          {grid ? <BsTable /> : <BsFillGrid3X3GapFill />}
        </button>
      </div>
      {children}
    </div>
  );
}
