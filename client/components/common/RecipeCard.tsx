import { useUser } from "@/context/userContext";
import { RecipeType } from "@/utils/types";
import axios from "axios";
import Link from "next/link";
import { Menu } from "primereact/menu";
import { useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { Toast } from "primereact/toast";
import { ConfirmPopup } from "primereact/confirmpopup";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

type PropType = {
  recipe: RecipeType;
  width?: string;
};
export default function RecipeCard({ recipe }: PropType): JSX.Element {
  const { user } = useUser();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const saveHandler = () => {
    const token = Cookies.get("token");
    if (user && user.favorites) {
      axios
        .put(
          `${process.env.BACK_END_URL}/user/update/${user._id}`,
          {
            favorites: [...user.favorites, recipe._id],
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.token) {
            Cookies.remove("token");
            Cookies.set("token", res.data.token);
            router.reload();
          }
        });
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toast = useRef<any>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const menu: React.MutableRefObject<any> = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  const items = [
    {
      icon: "pi pi-pencil",
      label: "edit",
      url: `/addRecipe?recipeId=${recipe._id}`,
    },
    {
      icon: "pi pi-trash",
      label: "delete",
      url: ``,
      command: () => {
        setVisible(true);
      },
    },
  ];
  function deleteHandler() {
    axios.delete(`${process.env.BACK_END_URL}/recipe/${recipe._id}`).then(() =>
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "You have deleted",
        life: 3000,
      })
    );
    console.log(recipe._id);
  }
  return (
    <div className="recipeCard relative group">
      <picture>
        <img src={recipe.images[0]} alt="" />
      </picture>
      <Link href={`/recipe/${recipe._id}`}>
        <div className="text">
          <div className="title">
            <h4>{recipe.title.slice(0, 20)}</h4>
          </div>
          <p>{recipe.description.slice(0, 80)}...</p>
          <button className="more">
            read more <span>&#8594;</span>
          </button>
        </div>
      </Link>
      <button
        onClick={saveHandler}
        className="favorite absolute bottom-[105px] right-5 text-xl text-red-500"
      >
        {user?.favorites?.some((fav) => fav == recipe._id) ? (
          <MdFavorite />
        ) : (
          <MdFavoriteBorder />
        )}
      </button>
      <ConfirmPopup
        visible={visible}
        onHide={() => setVisible(false)}
        message="do you want to delete"
        icon="pi pi-exclamation-triangle"
        accept={deleteHandler}
        reject={reject}
      />
      <Toast ref={toast} />
      {user && user._id == recipe.created_by._id && (
        <button
          className="p-1 group-hover:block hidden rounded-full bg-slate-50 bg-opacity-50 absolute top-1 right-1 text-2xl text-white hover:bg-opacity-70"
          onClick={(e) => {
            menu.current.toggle(e);
          }}
        >
          <BsThreeDots />
          <Menu model={items} popup ref={menu} className="mt-3" />
        </button>
      )}
    </div>
  );
}
