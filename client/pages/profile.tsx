import RecipeCard from "@/components/common/RecipeCard";
import { useRecipe } from "@/context/recipeContext";
import { useUser } from "@/context/userContext";
import Link from "next/link";

const randomCover = "https://source.unsplash.com/random/900%C3%97700/?food";
const randomProfile = "https://loremflickr.com/200/200/face";

const contentHeaderItems = [
  { icon: "pi pi-table", label: "Recipes", url: "/" },
  { icon: "pi pi-heart", label: "Favorites", url: "/profile/favorites" },
  { icon: "", label: "Reviews", url: "profile/reviews" },
];

export default function Profile() {
  const { recipes } = useRecipe();
  const { user } = useUser();
  console.log(user);
  return (
    <>
      <div className="profile container">
        {/* COVER */}
        <div className="cover">
          <picture>
            <img src={randomCover} alt="cover" />
          </picture>
        </div>

        <div className="content">
          {/* HEADER */}
          <div className="content-header">
            <ul>
              {contentHeaderItems.map((item, index) => (
                <li key={index}>
                  <Link href={item.url}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SIDE */}
          <div className="content-body">
            <div className="side">
              {/* PROFILE BOX */}
              <div className="side-box">
                <picture>
                  <img src={randomProfile} alt="profile" />
                </picture>
                <div className="profile-text">
                  <h2>{user?.username}</h2>
                  <p>{user?.email}</p>
                </div>
              </div>

              {/* BIO */}
              <div className="side-bio">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Excepturi error odio sit quaerat minima atque, esse provident
                  voluptatibus suscipit. Minus porro earum delectus reiciendis
                  quas! Repellat eaque corrupti quos ex.
                </p>
              </div>
            </div>

            <div className="recipes lg:w-9/12 flex h-full flex-wrap gap-3">
              {recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
