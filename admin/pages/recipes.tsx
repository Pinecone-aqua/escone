import React from "react";
import axios from "axios";

export default function recipes() {
  async function getUser() {
    try {
      const response = await axios.get("http://localhost:3030").then();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return <div>Recipes</div>;
}
