import axios from "axios";
import React, { useEffect, useState } from "react";
import { TagType } from "../../utils/types";

function Filter() {
  const [tags, setTags] = useState<TagType[] | undefined>();
  useEffect(() => {
    axios.get("http://localhost:3030/tag/all").then((res) => {
      setTags(res.data);
    });
  }, []);
  console.log(tags);
  return (
    <div>
      <div className="">
        {tags &&
          tags.map((tag, index) => (
            <div className="" key={index}>
              {tag.name}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Filter;
