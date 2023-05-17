import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { AiOutlineSearch } from "react-icons/ai";
import { BsArrowDownCircle } from "react-icons/bs";

export default function Header(): JSX.Element {
  const token = Cookies.get("token");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: any = token && jwtDecode(token);
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
          <button className="text-2xl">
            <BsArrowDownCircle />
          </button>
        </div>
      </div>
    </div>
  );
}
