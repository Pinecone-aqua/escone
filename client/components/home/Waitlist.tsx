import Image from "next/image";
import cover from "../../public/images/waitlist-cover.jpg";

export default function Waitlist() {
  return (
    <div className="">
      <div className="waitlist container">
        <picture>
          <Image src={cover} alt={"cover"} className="cover" />
        </picture>
        <div className="waitlist-box">
          <div className="text">
            <h2>Join the waitlist</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
              voluptates, eos ipsum rerum ipsam autem odit labore adipisci natus
              perspiciatis accusantium officiis!
            </p>
            <div className="inputs">
              <input type="email" placeholder="Email" />
              <input type="button" value="Subscribe" className="sub" />
            </div>
            <div className="checkbox">
              <input type="checkbox" />
              <span>I want to receive the promotion</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
