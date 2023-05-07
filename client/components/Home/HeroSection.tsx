import Image from "next/image";
import grape from "@/assets/grape.png";
import avocado from "@/assets/avocado.png";
import blueberry from "@/assets/blueberry.png";
import flour from "@/assets/flour.png";
import egg from "@/assets/egg.png";

export default function HeroSection() {
  return (
    <div className="">
      <div className="hero container">
        <div className="content">
          <div className="text">
            <h1>foodie</h1>
            <p>it&apos;s all about delicious.</p>
          </div>

          <div className="elements">
            <Image src={grape} alt="grape" className="abs grape" />
            <Image src={avocado} alt="avocado" className="abs avocado" />
            <Image src={blueberry} alt="blueberry" className="abs blueberry" />
            <Image src={flour} alt="flour" className="abs flour" />
            <Image src={egg} alt="egg" className="abs egg" />
          </div>
        </div>
      </div>
    </div>
  );
}
