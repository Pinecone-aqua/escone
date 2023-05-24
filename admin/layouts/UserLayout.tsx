import { useRouter } from "next/router";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { BsFillGrid3X3GapFill, BsTable } from "react-icons/bs";
type PropsType = {
  children: ReactNode;
  grid: boolean;
  setGrid: Dispatch<SetStateAction<boolean>>;
};
export default function UserLayout({ children, setGrid, grid }: PropsType) {
  const router = useRouter();
  return (
    <div>
      <div className="children-head">
        <p>Users</p>
        <label className="flex gap-2 items-center">
          <p>Үүрэг: </p>
          <select
            value={router.query.role}
            className={`border rounded-lg text-xl p-2`}
            onChange={(e) => {
              if (e.target.value != "any") {
                router.push({
                  query: { ...router.query, role: e.target.value },
                });
              } else {
                delete router.query.role;
                router.push({
                  query: { ...router.query },
                });
              }
            }}
          >
            <option value="any">any</option>
            <option value="admin">Admin</option>
            <option value="client">Client</option>
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
