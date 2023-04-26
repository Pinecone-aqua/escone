import React from "react";
import axios from "axios";

export default function Home() {
  axios.get("http://localhost:3030/recipe/all").then((res) => {
    console.log(res.data);
  });
  return <div>Home</div>;
}
