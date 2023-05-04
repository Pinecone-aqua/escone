import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import Categories from "./addRecipe/Categories";
import Tags from "./addRecipe/Tags";

export default function AddRecipe() {
  const [visible, setVisible] = useState<boolean>(false);
  const footerContent = (
    <div>
      <Button
        label="Cancel"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
      <Button label="Add" onClick={() => setVisible(false)} />
    </div>
  );

  const show = () => {
    setVisible(true);
  };

  // const [servings, setServings] = useState<number>(1);

  return (
    <div className="add-recipe">
      <Button label="Add recipe" onClick={() => show()} />
      <Dialog
        header="Add Recipe"
        className="add-recipe-modal"
        visible={visible}
        position="top-right"
        onHide={() => setVisible(false)}
        footer={footerContent}
      >
        <div className="add-recipe-modal-inputs">
          {/* title */}
          <div className="title">
            <label htmlFor="title">Title</label>
            <InputText className="title" />
          </div>

          {/* description */}
          <div className="description">
            <label htmlFor="description">Description</label>
            <InputTextarea autoResize rows={3} cols={30} />
          </div>

          {/* categories */}
          <div className="category">
            <label htmlFor="category" className="inline w-full">
              Category
            </label>
            <Categories />
          </div>

          {/* tags */}
          <div className="tags">
            <label htmlFor="tags" className="inline w-full">
              Tags
            </label>
            <Tags />
          </div>

          {/* servings */}
          <div className="servings">
            <label htmlFor="servings">Servings</label>
            <InputNumber
              // value={servings}
              // onValueChange={(e) => setServings(e.value)}
              showButtons
              buttonLayout="horizontal"
              decrementButtonClassName="p-button-secondary"
              incrementButtonClassName="p-button-secondary"
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
