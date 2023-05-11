import React from "react";
import { Offcanvas } from "react-offcanvas";

const OffCanvas = ({ isOpen, onClose }) => (
  <Offcanvas
    width={300}
    transitionDuration={300}
    effect={"overlay"}
    isMenuOpened={isOpen}
    onClose={onClose}
  >
    <div className="flex flex-col h-full bg-white p-4">
      <h1 className="text-lg font-medium mb-4">Off-canvas menu</h1>
      <p className="text-sm text-gray-500 mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ante nulla,
        venenatis quis mauris non, iaculis efficitur nisi.
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  </Offcanvas>
);

export default OffCanvas;
