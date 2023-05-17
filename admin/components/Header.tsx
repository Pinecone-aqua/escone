import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsArrowDownCircle } from "react-icons/bs";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { useRouter } from "next/router";
export default function Header(): JSX.Element {
  const token = Cookies.get("token");
  const menu = useRef<Menu>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: any = token && jwtDecode(token);
  const router = useRouter();

  const items: MenuItem[] = [
    {
      label: "Foodie web site",
      icon: "pi pi-fw pi-plus",
      url: "http://localhost:3000/",
    },
    {
      label: "Log out",
      icon: "pi pi-fw pi-trash",
      command: () => {
        Cookies.remove("token");
        router.reload();
      },
    },
  ];

  return (
    <div className="w-full  flex justify-between h-24 items-center">
      <div className="text-2xl font-semibold">Dashboard</div>
      <div className="flex gap-20 items-center">
        <div className="w-[430px] border relative ">
          <input
            type="text"
            className="w-full px-5 py-3 rounded-xl"
            placeholder="search"
          />
          <div className="text-3xl absolute top-2 end-5">
            <AiOutlineSearch />
          </div>
        </div>
        <div className="w-[300px] bg-white px-5 py-3 rounded-xl flex items-center gap-10 justify-between">
          <picture className="p-1 bg-green-500 rounded-full">
            <img
              src={"https://randomuser.me/api/portraits/thumb/men/98.jpg"}
              alt=""
              className="rounded-full"
            />
          </picture>

          <div className="text-xl font-semibold">
            <p className="text-sm text-green-500">ADMIN</p>
            <p>{user.username}</p>
          </div>
          <Menu model={items} popup ref={menu} />
          <button className="text-2xl" onClick={(e) => menu.current?.toggle(e)}>
            <BsArrowDownCircle />
          </button>
        </div>
      </div>
    </div>
  );
}
