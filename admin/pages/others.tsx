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
    <div className="children others">
      <div className="categories others-inner">
        <h3>Categories</h3>
        <div className="list">
          {categories.map((cat: CategoryType, index) => (
            <div className="item" key={cat._id}>
              <p>{cat.name}</p>
              <Toast ref={toast} />
              <ConfirmDialog
                visible={visible == cat._id}
                onHide={() => setVisible(undefined)}
                message="Устгахдаа итгэлтэй байна уу?"
                header="Баталгаажуулалт"
                icon="pi pi-exclamation-triangle"
                accept={() => deleteCategory(cat._id, index)}
                reject={() =>
                  toast.current?.show({
                    severity: "warn",
                    summary: "Болилоо",
                    detail: "Устгахаа болилоо",
                    life: 3000,
                  })
                }
              />
              <span className="trash" onClick={() => setVisible(cat._id)}>
                <TbTrash />
              </span>
            </div>
          ))}
        </div>
        <div className="add">
          <input
            type="text"
            placeholder="нэмэх категорио бичнэ үү"
            defaultValue={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <input type="button" value={"add"} onClick={addCategory} />
        </div>
      </div>
      <div className="tags others-inner">
        <h3>tags</h3>
        <div className="list">
          {tags.map((tg: TagType, index) => (
            <div className="item" key={tg._id}>
              <p>{tg.name}</p>
              <Toast ref={toast} />
              <ConfirmDialog
                visible={visible == tg._id}
                onHide={() => setVisible(undefined)}
                message="Устгахдаа итгэлтэй байна уу?"
                header="Баталгаажуулалт"
                icon="pi pi-exclamation-triangle"
                accept={() => deleteTag(tg._id, index)}
                reject={() =>
                  toast.current?.show({
                    severity: "warn",
                    summary: "Болилоо",
                    detail: "Устгахаа болилоо",
                    life: 3000,
                  })
                }
              />
              <span className="trash" onClick={() => setVisible(tg._id)}>
                <TbTrash />
              </span>
            </div>
          ))}
        </div>
        <div className="add">
          <input
            type="text"
            placeholder="нэмэх тагаа бичнэ үү"
            defaultValue={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <input type="button" value={"add"} onClick={addtag} />
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
