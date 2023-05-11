import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

const specialImgUrl =
  "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTd8fGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60";

export default function SpecialRecipe() {
  return (
    <div className="container">
      <div className="recipe">
        <h5>Special recipe</h5>
        <div className="recipe-page">
          <picture>
            <img src={specialImgUrl} alt="food" />
          </picture>
          <div className="recipe-text">
            <div>
              <h6>Ingredients</h6>
              <p>
                {" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
                commodi harum nihil magni? Vel assumenda, repudiandae optio
                facere suscipit iste rem numquam autem culpa, blanditiis quasi
                excepturi soluta exercitationem reiciendis. Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Vitae distinctio, tempore
                necessitatibus explicabo minima nam odit est tenetur pariatur
                at. Inventore nihil commodi perspiciatis! Neque itaque autem
                voluptas quaerat cum?
              </p>
            </div>
            <div className="btns">
              <button>
                <MdOutlineArrowBackIos />
              </button>
              <button>
                <MdOutlineArrowForwardIos />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
