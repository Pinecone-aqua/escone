import React from "react";

type propType = {
  text: string;
  className?: string;
};

function MainBtn({ text, className }: propType) {
  return (
    <button
      className={`px-8 py-2 bg-primary rounded-full text-white hover:shadow-xl  text-lg  ${className}`}
    >
      {text}
    </button>
  );
}

export default MainBtn;
