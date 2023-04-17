import Image from "next/image";
import logo from "@/assets/logo-main.svg";
import introIcons from "@/assets/introduce-elements.svg";

export default function Introduce(): JSX.Element {
  return (
    <div className="container relative flex mx-auto my-5 w-full md:w-[720px] lg:w-[960px] xl:w-[1140px] h-[420px] items-center bg-light-orange rounded-2xl ">
      <Image src={introIcons} alt="introIcons" />
      <div className="absolute w-full h-full top-0 flex flex-col items-center justify-center gap-10 text-black/70">
        <Image src={logo} alt="logo" />
        <div className="block text-lg md:text-2xl font-bold ">
          Foodie is a platform for sharing.
          <span className="block">Sharing recipes and ingredients.</span>
        </div>
        <p className="text-sm md:text-sm-reg">
          It&apos;s all about delicious! &#128523;
        </p>
      </div>
    </div>
  );
}
