import { useUser } from "@/context/userContext";
import { RecipeType } from "@/utils/types";
import axios from "axios";
import Link from "next/link";
import { Menu } from "primereact/menu";
import { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { Toast } from "primereact/toast";
import { ConfirmPopup } from "primereact/confirmpopup";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Carousel } from "@material-tailwind/react";
type PropType = {
  recipe: RecipeType;
  width?: string;
};

export default function RecipeCard({ recipe }: PropType): JSX.Element {
  const { user, setToken } = useUser();
  const [visible, setVisible] = useState(false);
  const [favorite, setFavorite] = useState<string[]>([]);
  const toast = useRef<Toast>(null);
  const menu = useRef<Menu>(null);
  const router = useRouter();
  useEffect(() => {
    user && user.favorites && setFavorite(user.favorites);
  }, [recipe, recipe.images, user]);

  const saveHandler = () => {
    const token = Cookies.get("token");
    let message = "Та нэвтрэх хэрэгтэй";
    if (user) {
      let newFavorite = [];
      if (favorite.some((favRec) => favRec == recipe._id)) {
        message = "Жорыг таалагдсан хэсгээс хаслаа";
        newFavorite = favorite.filter((favRec) => favRec != recipe._id);
        setFavorite([...newFavorite]);
      } else {
        message = "Жорыг таалагдсан хэсэгт нэмлээ";
        newFavorite = [...favorite, recipe._id];
        setFavorite([...favorite, recipe._id]);
      }
      axios
        .put(
          `${process.env.NEXT_PUBLIC_BACK_END_URL}/user/update/${user._id}`,
          {
            favorites: newFavorite,
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
            setToken(res.data.token);
            toast.current?.show({
              severity: "success",
              summary: "",
              detail: message,
              life: 3000,
            });
          }
        });
    }
  };

  const reject = () => {
    toast.current?.show({
      severity: "warn",
      summary: "Цуцлагдлаа",
      detail: "Устгах хүсэлт цуцлагдлаа.",
      life: 3000,
    });
  };

  const items = [
    {
      icon: "pi pi-pencil",
      label: "Засах",
      url: `/addRecipe?recipeId=${recipe._id}`,
    },
    {
      icon: "pi pi-trash",
      label: "Устгах",
      url: ``,
      command: () => {
        setVisible(true);
      },
    },
  ];

  function deleteHandler() {
    axios
      .delete(`${process.env.NEXT_PUBLIC_BACK_END_URL}/recipe/${recipe._id}`)
      .then(() => {
        toast.current?.show({
          severity: "success",
          summary: "Амжилттай",
          detail: "Устгах хүсэлт амжиллтай.",
          life: 3000,
        });
        router.reload();
      });
  }

  return (
    <div className="recipe-card relative group">
      <Carousel className="rounded-xl">
        {recipe.images.map((image, index) => (
          <Link href={`/recipe/${recipe._id}`} key={index}>
            <picture className="w-[335px] h-full ">
              <img
                src={image}
                alt=""
                className=" object-cover w-full h-full "
              />
            </picture>
          </Link>
        ))}
      </Carousel>{" "}
      <Link href={`/recipe/${recipe._id}`}>
        <div className="text">
          <div className="title">
            <h4>{recipe.title.slice(0, 20)}</h4>
          </div>
          <p>{recipe.description.slice(0, 80)}...</p>
          <button className="more">
            дэлгэрэнгүй <span>&#8594;</span>
          </button>
        </div>
      </Link>
      <button onClick={saveHandler} className="favorite">
        {favorite.some((fav: string) => fav == recipe._id) ? (
          <MdFavorite />
        ) : (
          <MdFavoriteBorder />
        )}
      </button>
      <ConfirmPopup
        visible={visible}
        onHide={() => setVisible(false)}
        message="Та устгахыг хүсч байна уу?"
        icon="pi pi-exclamation-triangle"
        accept={deleteHandler}
        reject={reject}
      />
      <Toast ref={toast} />
      {user && user._id == recipe.created_by._id && (
        <button
          className="p-1 group-hover:block hidden rounded-full bg-slate-50 bg-opacity-50 absolute top-1 right-1 text-2xl text-white hover:bg-opacity-70"
          onClick={(e) => {
            menu.current?.toggle(e);
          }}
        >
          <BsThreeDots />
          <Menu model={items} popup ref={menu} className="mt-3" />
        </button>
      )}
    </div>
  );
}
