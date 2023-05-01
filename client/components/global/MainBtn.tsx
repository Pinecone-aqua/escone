import React from "react";

type propType = {
  text: string;
  className?: string;
  handler?: () => void;
};

function MainBtn({ text, className, handler }: propType) {
  return (
    <button
      className={`px-8 py-2 bg-primary rounded-full text-white hover:shadow-xl  text-lg  ${className}`}
      onClick={handler}
    >
      {text}
    </button>
  );
}

export default MainBtn;
