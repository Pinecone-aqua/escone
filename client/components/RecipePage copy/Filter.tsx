import axios from "axios";
import React, { useEffect } from "react";

function Filter() {
  useEffect(() => axios.get("http://localhost:3030/tags").then(() => {}));
  return <div>s</div>;
}

export default Filter;
