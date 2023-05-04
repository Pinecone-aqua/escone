import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import Categories from "./addRecipe/Categories";
import Tags from "./addRecipe/Tags";

export default function AddRecipe() {
  const [ModalVisible, setModalVisible] = useState<boolean>(false);
  const modalFooter = (
    <div>
      <Button
        label="Cancel"
        onClick={() => setModalVisible(false)}
        className="p-button-text"
      />
      <Button label="Add" onClick={() => setModalVisible(false)} />
    </div>
  );

  const show = () => setModalVisible(true);

  const [servings, setServings] = useState<number>(1);

  return (
    <div className="add-recipe">
      <Button label="Add" onClick={() => show()} />
      <Dialog
        header="Add Recipe"
        className="add-recipe-modal"
        visible={ModalVisible}
        position="top-right"
        onHide={() => setModalVisible(false)}
        footer={modalFooter}
      >
        <div className="add-recipe-modal-inputs">
          {/* title */}
          <div className="title">
            <label htmlFor="title">Title</label>
            <InputText className="input" />
          </div>

          {/* description */}
          <div className="description">
            <label htmlFor="description">Description</label>
            <InputTextarea autoResize rows={2} cols={30} className="input" />
          </div>

          {/* image uploader */}
          <div className="image">
            <label htmlFor="image">Image</label>
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
              value={servings}
              className="servings-input"
              onValueChange={(e) => {
                if (typeof e.value === "number") {
                  setServings(e.value);
                }
              }}
              showButtons
              buttonLayout="horizontal"
              decrementButtonClassName="p-button-secondary"
              incrementButtonClassName="p-button-secondary"
              // incrementButtonIcon="pi pi-plus"
              // decrementButtonIcon="pi pi-minus"
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
