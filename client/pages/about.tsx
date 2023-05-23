import Image from "next/image";
import cover from "../public/images/background.jpg";
import Logo from "@/public/Logo";

export default function About() {
  return (
    <div className="about">
      <div className="about-hero">
        <picture>
          <Image src={cover} alt={"cover"} className="cover" />
        </picture>
        <div className="logo">
          <Logo />
        </div>
      </div>
      <div className="container">
        <h1>Welcome to FOODIE, the ultimate recipe sharing community!</h1>

        <section className="main">
          <div>
            <p>
              At FOODIE, we believe that cooking is more than just a daily
              chore—it&apos;s an opportunity for creativity, exploration, and
              connection. Our platform was born out of a passion for bringing
              people together through the joy of food. Whether you&apos;re a
              seasoned chef or a kitchen novice, we&apos;re here to inspire and
              empower you to create delicious meals and memorable dining
              experiences.
            </p>
          </div>
        </section>

        <section className="mission">
          <div>
            <h2>Our Mission</h2>
            <p>
              Our Mission is make cooking accessible to everyone, regardless of
              their skill level or dietary preferences. We strive to provide a
              vibrant and inclusive community where food lovers from all walks
              of life can come together to discover, share, and celebrate
              culinary creations. With a wide range of recipes, tips, and
              resources, we aim to transform every meal into a delightful
              adventure.
            </p>
          </div>
        </section>

        <section className="features">
          <div className="feature">
            <h3>Recipe Sharing:</h3>
            <p>
              Our platform is built around the idea of sharing. You can upload
              your favorite recipes, complete with detailed instructions,
              ingredients, and mouth-watering photos. Share your culinary
              creations with the community and receive feedback, suggestions,
              and appreciation from fellow food enthusiasts.
            </p>
          </div>

          <div className="feature">
            <h3>Personalized Recommendations:</h3>
            <p>
              We understand that everyone has unique tastes and dietary needs.
              That&apos;s why we offer personalized recipe recommendations based
              on your preferences. Whether you&apos;re looking for vegetarian,
              gluten-free, or quick and easy recipes just for you.
            </p>
          </div>
        </section>

        <section className="description">
          <div>
            <p>
              Join our community today and embark on a culinary journey like no
              other. Whether you&apos;re seeking inspiration, seeking to share
              your favorite recipes, or simply looking to connect with fellow
              foodies, FOODIE is here to satisfy your appetite for delicious
              experiences.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
