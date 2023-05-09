import { PropType, reviewContextType, ReviewType } from "@/utils/types";
import axios from "axios";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";

const reviewContext = createContext<reviewContextType>({} as reviewContextType);

export const useReview = () => useContext(reviewContext);
export default function ReviewProvider({ children }: PropType) {
  const [review, setReview] = useState<ReviewType[] | undefined>([]);
  const { query } = useRouter();
  console.log(query);

  useEffect(() => {
    console.log("hello");
    query.id &&
      axios
        .get(`http://localhost:3030/review/recipe/${query.id}`)
        .then((res) => setReview(res.data));
  }, [query]);

  return (
    <reviewContext.Provider value={{ review, setReview }}>
      {children}
    </reviewContext.Provider>
  );
}
