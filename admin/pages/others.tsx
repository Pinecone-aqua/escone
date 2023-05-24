import { CategoryType, TagType } from "@/utils/types";
import axios from "axios";
import Cookies from "js-cookie";
import { GetServerSideProps } from "next";
import React, { useEffect, useRef, useState } from "react";
import { TbTrash } from "react-icons/tb";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

export default function Other({
  category,
  tag,
}: {
  category: CategoryType[];
  tag: TagType[];
}): JSX.Element {
  const [visible, setVisible] = useState<string>();
  const toast = useRef<Toast>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [tags, setTags] = useState<TagType[]>([]);
  const [newCategory, setNewCategory] = useState<string>();
  const [newTag, setNewTag] = useState<string>();
  const token = Cookies.get("token");
  useEffect(() => {
    setCategories(category);
    setTags(tag);
  }, [category, tag]);

  function addCategory() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newCategoryObj: any = { name: newCategory };
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACK_END_URL}/category/add`,
        newCategoryObj,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() =>
        toast.current?.show({
          severity: "success",
          summary: "Confirmed",
          detail: "You have added",
          life: 3000,
        })
      );
    newCategoryObj._id = Math.random();
    setCategories([...categories, newCategoryObj]);
  }

  function deleteCategory(id: string, index: number) {
    categories.splice(index, 1);
    setCategories([...categories]);
    axios
      .delete(`${process.env.NEXT_PUBLIC_BACK_END_URL}/category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() =>
        toast.current?.show({
          severity: "success",
          summary: "Confirmed",
          detail: "You have deleted",
          life: 3000,
        })
      );
  }
  function addtag() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newTagObj: any = { name: newTag };
    axios
      .post(`${process.env.NEXT_PUBLIC_BACK_END_URL}/tag/add`, newTagObj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() =>
        toast.current?.show({
          severity: "success",
          summary: "Confirmed",
          detail: "You have added",
          life: 3000,
        })
      );
    newTagObj._id = Math.random();
    setTags([...tags, newTagObj]);
  }

  function deleteTag(id: string, index: number) {
    tags.splice(index, 1);
    setTags([...tags]);
    axios
      .delete(`${process.env.NEXT_PUBLIC_BACK_END_URL}/tag/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() =>
        toast.current?.show({
          severity: "success",
          summary: "Confirmed",
          detail: "You have deleted",
          life: 3000,
        })
      );
  }
  return (
    <div className="children others w-full flex gap-4">
      <div className="h-[80vh] flex-col w-1/2">
        <h1 className="text-2xl font-semibold text-blue-800 ">Categories</h1>
        <div className=" h-full flex flex-col flex-wrap gap-3">
          {categories.map((cat: CategoryType, index) => (
            <div
              key={cat._id}
              className="py-1 px-4 bg-green-400 text-green-800 rounded-full border-2 border-green-800 flex justify-between items-center"
            >
              <p>{cat.name}</p>
              <Toast ref={toast} />
              <ConfirmDialog
                visible={visible == cat._id}
                onHide={() => setVisible(undefined)}
                message="Are you sure you want to delete?"
                header="Confirmation"
                icon="pi pi-exclamation-triangle"
                accept={() => deleteCategory(cat._id, index)}
                reject={() =>
                  toast.current?.show({
                    severity: "warn",
                    summary: "Rejected",
                    detail: "You have rejected",
                    life: 3000,
                  })
                }
              />
              <p className="text-red-500" onClick={() => setVisible(cat._id)}>
                <TbTrash />
              </p>
            </div>
          ))}
          <input
            type="text"
            placeholder="new category"
            defaultValue={newCategory}
            className="py-1 px-4 bg-blue-400 text-blue-950 rounded-full border-2 border-blue-800 placeholder:text-black"
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <input
            type="button"
            value={"add"}
            className="px-3 py-1 rounded-full  bg-green-500"
            onClick={addCategory}
          />
        </div>
      </div>
      <div className="h-[80vh] flex-col w-1/2">
        <h1 className="text-2xl font-semibold text-blue-800 ">tags</h1>
        <div className=" h-full flex flex-col flex-wrap gap-3">
          {tags.map((tg: TagType, index) => (
            <div
              key={tg._id}
              className="py-1 px-4 bg-green-400 text-green-800 rounded-full border-2 border-green-800 flex justify-between items-center"
            >
              <p>{tg.name}</p>
              <Toast ref={toast} />
              <ConfirmDialog
                visible={visible == tg._id}
                onHide={() => setVisible(undefined)}
                message="Are you sure you want to delete?"
                header="Confirmation"
                icon="pi pi-exclamation-triangle"
                accept={() => deleteTag(tg._id, index)}
                reject={() =>
                  toast.current?.show({
                    severity: "warn",
                    summary: "Rejected",
                    detail: "You have rejected",
                    life: 3000,
                  })
                }
              />
              <p className="text-red-500" onClick={() => setVisible(tg._id)}>
                <TbTrash />
              </p>
            </div>
          ))}
          <input
            type="text"
            placeholder="new category"
            defaultValue={newTag}
            className="py-1 px-4 bg-blue-400 text-blue-950 rounded-full border-2 border-blue-800 placeholder:text-black"
            onChange={(e) => setNewTag(e.target.value)}
          />
          <input
            type="button"
            value={"add"}
            className="px-3 py-1 rounded-full  bg-green-500"
            onClick={addtag}
          />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const responseCategory = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_END_URL}/category/all`
    );
    const responseTag = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_END_URL}/tag/all`
    );
    const category = responseCategory.data;
    const tag = responseTag.data;

    return {
      props: {
        category,
        tag,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        category: null,
        tag: null,
      },
    };
  }
};
