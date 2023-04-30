import Image from "next/image";
import logo from "@/assets/logo-main.svg";
import introIcons from "@/assets/introduce-elements.svg";

export default function Introduce(): JSX.Element {
  return (
    <div className="container relative flex items-center rounded-2xl max-w-full border min-h-[260px]">
      <Image src={introIcons} alt="introIcons" className="w-full container" />

      <div className="absolute w-full h-full top-0 flex flex-col items-center justify-center gap-10 text-black/70">
        <Image src={logo} alt="logo" width={"100"} />

        <div className="block text-lg sm:text-3xl font-bold ">
          Foodie is a platform for sharing.
          <span className="block">Sharing recipes and ingredients.</span>
        </div>

        <p className="text-sm sm:text-sm-reg">
          It&apos;s all about delicious! &#128523;
        </p>
      </div>
    </div>
  );
}
