import axios from "axios";
import React, { useEffect, useState } from "react";
import { TagType } from "../../utils/types";

function Filter() {
  const [tags, setTags] = useState<TagType[] | undefined>();
  const [isSelect, setIsSelect] = useState<number[]>([]);
  useEffect(() => {
    axios.get("http://localhost:3030/tag/all").then((res) => {
      setTags(res.data);
    });
  }, []);
  function selectHandler(index: number) {
    if (isSelect.some((val) => val == index)) {
      const i = isSelect.indexOf(index);
      const newArr = isSelect.splice(i, 1);
      console.log(newArr);
      setIsSelect([...isSelect]);
    } else {
      setIsSelect([...isSelect, index]);
    }
  }
  console.log();
  return (
    <div>
      <div className="w-full flex flex-wrap gap-3 justify-center">
        {tags &&
          tags.map((tag, index: number) => (
            <button
              className={`border border-black px-3 py-1 rounded-full ${
                isSelect.some((val) => val == index) &&
                `bg-primary text-white border-none`
              } `}
              key={index}
              onClick={() => selectHandler(index)}
            >
              {tag.name}
            </button>
          ))}
      </div>
    </div>
  );
}

export default Filter;
