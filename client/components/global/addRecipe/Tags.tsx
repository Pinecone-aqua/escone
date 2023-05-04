import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import React, { useState } from "react";

export default function Tags() {
  const [tags, setTags] = useState<string[]>([]);

  const onTagsChange = (e: CheckboxChangeEvent) => {
    const _tags = [...tags];
    if (e.checked) _tags.push(e.value);
    else _tags.splice(_tags.indexOf(e.value), 1);
    setTags(_tags);
  };

  return (
    <div className="card flex justify-content-center gap-3">
      <div className="flex align-items-center">
        <Checkbox
          inputId="ingredient1"
          name="pizza"
          value="Cheese"
          onChange={onTagsChange}
          checked={tags.includes("Cheese")}
        />
        <label htmlFor="ingredient1" className="ml-2">
          Cheese
        </label>
      </div>
      <div className="flex align-items-center">
        <Checkbox
          inputId="ingredient2"
          name="pizza"
          value="Mushroom"
          onChange={onTagsChange}
          checked={tags.includes("Mushroom")}
        />
        <label htmlFor="ingredient2" className="ml-2">
          Mushroom
        </label>
      </div>
      <div className="flex align-items-center">
        <Checkbox
          inputId="ingredient3"
          name="pizza"
          value="Pepper"
          onChange={onTagsChange}
          checked={tags.includes("Pepper")}
        />
        <label htmlFor="ingredient3" className="ml-2">
          Pepper
        </label>
      </div>
      <div className="flex align-items-center">
        <Checkbox
          inputId="ingredient4"
          name="pizza"
          value="Onion"
          onChange={onTagsChange}
          checked={tags.includes("Onion")}
        />
        <label htmlFor="ingredient4" className="ml-2">
          Onion
        </label>
      </div>
    </div>
  );
}
