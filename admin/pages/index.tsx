import { useEffect, useState } from "react";
import axios from "axios";
// import ModalEdit from "@/components/Modal";

export default function Home() {
  const [data, setData] = useState([]);
  const [refresh,setRefresh] = useState([]);
  const [showModal,setShowModal] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:3030/recipes/all").then((res) => {
      setData(res.data);
    });
  }, [refresh]);
  console.log("data: ", data);
  function deleteHandler(id :string){
    axios
      .delete(`http://localhost:3030/recipes/deny/${id}`)
      .then((res) => setRefresh(res))
  }

  const recipes = data.map((recipes) => (
      // eslint-disable-next-line react/jsx-key
      <div>
        <h2>{recipes.title}</h2>
        <div className="flex justify-evenly mb-10 h-20">
          {" "}
          <img className="w-20 h-20" src={recipes.images[0]} alt="" />
          <span>{recipes.description}</span>{" "}
          <div>
            <button onClick={()=>{setShowModal(true)}} className="rounded bg-amber-200 w-full">Edit</button>
            <button onClick={()=> {deleteHandler(recipes._id)}} className="rounded bg-red-400 w-full">Delete</button>
          </div>
        </div>{" "}
      </div>
    ));
  return (
    <div>
      <span>{recipes}</span>
    </div>
  );
}
