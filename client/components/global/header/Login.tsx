import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import {
  FaFacebook,
  FaGoogle,
  FaInstagram,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

// destructured variable class
const linkClass =
  "flex items-center justify-center w-[64px] h-[64px] rounded-full bg-gray-100";
const inputClass =
  "w-[285px] lg:w-[550px] h-[55px] border border-gray-300 rounded-xl placeholder:text-gray-400";
const linksListClass = "flex justify-center w-1/3 md:w-1/5 mt-3";
const buttonClass =
  "w-full h-[55px] border-none bg-primary text-white rounded-xl";
// ---------------------------

type prop = {
  setShow: Dispatch<SetStateAction<boolean>>;
};

const Login = ({ setShow }: prop): JSX.Element => {
  const Router = useRouter();

  function googleHandler() {
    console.log("clicked");
    axios
      .get("http://localhost:3030/user/google")
      .then((res) => Router.push(res.data));
  }
  const closeLogin = () => {
    setShow(false);
  };
  return (
    <div className="fixed flex items-center justify-center top-0 left-0  bg-black/30 w-screen h-screen z-10">
      <div className="login-modal w-[335px] h-[575px] bg-white rounded-3xl md:w-[680px] p-3">
        <div className="login-modal-close flex w-full justify-end">
          <button
            className="flex items-center justify-center w-[48px] h-[48px] rounded-full"
            onClick={closeLogin}
          >
            <IoCloseOutline className="fill-gray-600 w-10 h-10 " />
          </button>
        </div>
        <div className="flex flex-col login-modal-content justify-center items-center">
          <h1 className="text-2xl-semibold text-gray-800">Sign up</h1>
          <p className="flex flex-col items-center text-gray-600">
            Sign up with your social media account
            <span className="block">or email address</span>
          </p>

          {/* LINKS w ICON */}
          <ul className="flex flex-wrap items-center m-3 justify-evenly text-gray-800 text-md-reg w-[335px] lg:w-[415px]">
            <li className={linksListClass} onClick={googleHandler}>
              <Link href={"#"} className={linkClass}>
                <FaGoogle className="w-[32px] h-[32px]" />
              </Link>
            </li>
            <li className={linksListClass}>
              <Link href={"#"} className={linkClass}>
                <FaPinterest className="w-[32px] h-[32px]" />
              </Link>
            </li>
            <li className={linksListClass}>
              <Link href={"#"} className={linkClass}>
                <FaTwitter className="w-[32px] h-[32px]" />
              </Link>
            </li>
            <li className={linksListClass}>
              <Link href={"#"} className={linkClass}>
                <FaInstagram className="w-[32px] h-[32px]" />
              </Link>
            </li>
            <li className={linksListClass}>
              <Link href={"#"} className={linkClass}>
                <FaFacebook className="w-[32px] h-[32px]" />
              </Link>
            </li>
          </ul>

          {/* DIVIDER */}
          <div className="relative flex py-3 items-center">
            <div className="flex-grow border-t border-gray-400" />
            <span className="flex-shrink mx-4 text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-400" />
          </div>
          {/* DIVIDER */}

          <form className="my-2">
            <label className="mb-2 text-sm font-medium sr-only">Search</label>
            <div className="relative flex flex-col gap-3">
              <input
                type="search"
                className={inputClass}
                placeholder="Email Address"
              />
              <input
                type="password"
                className={inputClass}
                placeholder="Password"
              />
              <div className="buttons flex gap-3">
                <button className={buttonClass}>Login</button>
                <button className={buttonClass}>Sign up</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
