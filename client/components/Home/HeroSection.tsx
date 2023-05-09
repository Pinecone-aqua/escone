import Image from "next/image";
import item1 from "../../public/images/item1.png";
import item2 from "../../public/images/item2.png";
import item3 from "../../public/images/item3.png";
import item4 from "../../public/images/item4.png";
import item5 from "../../public/images/item5.png";

export default function HeroSection() {
  return (
    <div className="">
      <div className="hero">
        <div className="content">
          <div className="text">
            <h1>foodie</h1>
            <p>it&apos;s all about delicious.</p>
          </div>

          <div className="elements">
            <Image src={item1} alt="item1" className="abs item1 grape" />
            <Image src={item2} alt="item2" className="abs item2 avocado" />
            <Image src={item3} alt="item3" className="abs item3 blueberry" />
            <Image src={item4} alt="item4" className="abs item4 flour" />
            <Image src={item5} alt="item5" className="abs item5 egg" />
          </div>
        </div>
      </div>
    </div>
  );
}
