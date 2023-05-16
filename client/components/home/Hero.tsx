import Image from "next/image";
import item1 from "../../public/images/item1.png";
import item2 from "../../public/images/item2.png";
import item3 from "../../public/images/item3.png";
import item4 from "../../public/images/item4.png";
import item5 from "../../public/images/item5.png";

export default function HeroSection() {
  return (
    <div className="hero">
      <div className="content">
        <h1>foodie</h1>
        <p>it&apos;s all about delicious.</p>
        <Image src={item2} alt="item2" className="abs" />
      </div>

      <div className="items">
        <Image src={item1} alt="item1" className="abs" />
        <Image src={item3} alt="item3" className="abs" />
        <Image src={item4} alt="item4" className="abs" />
        <Image src={item5} alt="item5" className="abs" />
      </div>
    </div>
  );
}
