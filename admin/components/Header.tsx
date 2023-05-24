import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";
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
      label: "Client ~ FOODIE",
      url: "https://foodie-woad.vercel.app/",
    },
    {
      label: "Log out",
      command: () => {
        Cookies.remove("token");
        router.reload();
      },
    },
  ];

  return (
    <div className="header">
      <h1>Dashboard</h1>
      <form
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSubmit={(e: any) => {
          e.preventDefault();
          router.push({ query: { search: e.target.search.value } });
        }}
        className="flex items-center gap-2 "
      >
        <input type="text" placeholder="search ..." name="search" />
        <button type="submit">search</button>
      </form>
      <Menu model={items} popup ref={menu} />
      <button onClick={(e) => menu.current?.toggle(e)}>
        <MdAdminPanelSettings />
        Hello, {user.username} <IoIosArrowDown />
      </button>
    </div>
  );
}
