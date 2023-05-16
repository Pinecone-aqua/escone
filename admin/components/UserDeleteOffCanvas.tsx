import React, { Dispatch, SetStateAction } from "react";
import { Sidebar } from "primereact/sidebar";
import { ConfirmPopup } from "primereact/confirmpopup";

type PropsType = {
  isOffCanvasOpen: boolean;
  setIsOffCanvasOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
  email: string;
};

function OffCanvas({
  isOffCanvasOpen,
  setIsOffCanvasOpen,
  id,
  email,
}: PropsType) {
  function hideHandler() {
    setIsOffCanvasOpen(false);
  }
  return (
    <Sidebar
      visible={isOffCanvasOpen}
      position="right"
      onHide={hideHandler}
      className="p-sidebar-lg"
    >
      {" "}
      <div className="flex flex-col h-full bg-white p-4">
        <h1 className="text-lg font-medium mb-4">Off-canvas menu</h1>
        <p className="text-sm text-gray-500 mb-4">
          Are you sure you wanna delete {email} ?
        </p>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={hideHandler}
          >
            Close
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={hideHandler}
          >
            Yes
          </button>
        </div>
      </div>
    </Sidebar>
  );
}

export default OffCanvas;
