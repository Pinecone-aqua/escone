import React from "react";

function index({ datas }) {
  return (
    <div>
      {datas.map((data) => (
        <>{data.name}</>
      ))}
    </div>
  );
}

export default index;

export function getServerSideProp(context) {
  //from context get query/param
  //fetch filtered data from be using query/param
  //useRouter ashiglaj boldog baij magadgui
  return {
    props: {
      datas: [],
    },
  };
}
