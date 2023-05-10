import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { useRouter } from "next/router";
import axios from "axios";
import { RecipeType } from "@/utils/types";
import { FileUpload } from "primereact/fileupload";

type PropType = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};
function Offcanva({ show, setShow }: PropType) {
  const router = useRouter();
  const [recipe, setRecipe] = useState<RecipeType>();
  function hideHandler() {
    setShow(false);
    const { pathname } = router;
    router.push({ pathname }, undefined, { shallow: true });
  }
  useEffect(() => {
    setRecipe(undefined);
    router.query.id &&
      axios
        .get(`http://localhost:3030/recipes/${router.query.id}`)
        .then((res) => setRecipe(res.data));
  }, [router.query.id]);

  return (
    <div>
      (
      <Sidebar
        visible={show}
        position="right"
        onHide={hideHandler}
        className="p-sidebar-md"
      >
        <h2>Recipe edit</h2>

        <div className="w-full ">
          <form className="px-10 py-5 flex flex-col gap-5">
            <label className="flex flex-col gap-3">
              <p className="text-xl font-semibold">Title</p>
              <input
                type="text"
                className="border w-full px-3 py-2 rounded-xl"
              />
            </label>
            <label className="flex flex-col gap-3">
              <p className="text-xl font-semibold">Image upload</p>
              <div className="flex flex-wrap justify-between">
                {recipe?.images.map((img, index) => (
                  <img src={img} alt="" key={index} className="w-20" />
                ))}
              </div>

              <FileUpload
                name="imageUpload"
                url={"/api/upload"}
                multiple
                accept="image/*"
              />
            </label>
            <label>
              <p>Description</p>
              <textarea name="" id="" cols="30" rows="10">
                {recipe?.description}
              </textarea>
            </label>
          </form>
        </div>
      </Sidebar>
      )
    </div>
  );
}

export default Offcanva;
// ) : (
//           <div className="w-full flex justify-center">
//             <div className="w-16 h-16 border-4 border-blue-400 border-double rounded-full animate-spin">
//               <span className="bg-white h-1 w-1 text-white">.</span>
//             </div>
//           </div>
//         )
