import { useEffect, useState } from "react";
import axios from "axios";
import { RecipeType } from "@/utils/types";
// import ModalEdit from "@/components/Modal";

export default function Home() {
  const [data, setData] = useState<RecipeType[]>([]);
  const [refresh,setRefresh] = useState([]);
  // const [showModal,setShowModal] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:3030/recipes/all").then((res) => {
      setData(res.data);
    });
  }, [refresh]);
  console.log("data: ", data);
  function deleteHandler(id :string){
    axios
      .delete(`http://localhost:3030/recipes/deny/${id}`)
      .then((res) => setRefresh(res.data))
  }


  return (
    <div>
      <span>{data.map((recipe,index) => <div key={index}>
        <h2>{recipe.title}</h2>
        <div className="flex justify-evenly mb-10 h-20">
        <picture>
          <img className="w-20 h-20" src={recipe.images[0]} alt="" />
        </picture>
          <span>{recipe.description}</span>{" "}
          <div>
            <button  className="rounded bg-amber-200 w-full">Edit</button>
            <button onClick={()=> {deleteHandler(recipe._id)}} className="rounded bg-red-400 w-full">Delete</button>
          </div>
        </div>{" "}
      </div>
    )}</span>
    </div>
  );
}
