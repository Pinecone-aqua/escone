import { RecipeType } from "@/utils/types";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
type PropType = {
  recipes: RecipeType[];
  setShow: Dispatch<SetStateAction<boolean>>;
};

function Table({ recipes, setShow }: PropType) {
  const router = useRouter();

  function showHandler(id: string) {
    setShow(true);
    router.push({ query: { id: id } });
  }
  return (
    <table className="w-full border-collapse bg-white text-left text-sm text-gray-500 ">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">
            Created by
          </th>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">
            title
          </th>

          <th scope="col" className="px-6 py-4 font-medium text-gray-900">
            description
          </th>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">
            Tags
          </th>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">
            Categories
          </th>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">
            date
          </th>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">
            status
          </th>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">
            same
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 border-t border-gray-100">
        {recipes.map((recipe, index) => (
          <tr className="hover:bg-gray-50" key={index}>
            <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
              <div className="relative h-10 w-10">
                <img
                  className="h-full w-full rounded-full object-cover object-center"
                  src={recipe.created_by.image}
                  alt=""
                />
                <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white" />
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-700">
                  {recipe.created_by.username}
                </div>
                <div className="text-gray-400">{recipe.created_by.email}</div>
              </div>
            </th>
            <td className="px-6 py-4 text-black">{recipe.title}</td>

            <td className="px-6 py-4">{recipe.description}</td>
            <td className="px-6 py-4">
              <div className="flex gap-2 flex-wrap">
                {recipe.tags.slice(0, 5).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex gap-2 flex-wrap">
                {recipe.categories.slice(0, 5).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 rounded-full bg-pink-50 px-2 py-1 text-xs font-semibold text-pink-600"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </td>
            <td className="px-6 py-4 text-black">
              {dayjs(recipe.created_date).format("YYYY MMM/DD")}
            </td>
            <td className="px-6 py-4">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold  ${
                  recipe.status == "pending"
                    ? `bg-orange-50 text-orange-600`
                    : recipe.status == "deny"
                    ? `bg-red-50 text-red-600`
                    : `bg-green-50 text-green-600`
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    recipe.status == "pending"
                      ? `bg-orange-600`
                      : recipe.status == "deny"
                      ? `bg-red-600`
                      : `bg-green-600`
                  } `}
                />
                {recipe.status}
              </span>
            </td>
            <td className="px-6 py-4">
              <div className="flex justify-end gap-4">
                <button>delete</button>
                <button onClick={() => showHandler(recipe._id)}>edit</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
