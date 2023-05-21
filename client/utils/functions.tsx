import dayjs from "dayjs";
import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface StarProps {
  rate: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function starPrinter({ rate, onClick }: StarProps): JSX.Element[] {
  const roundedRate = Math.round(rate);
  const stars: JSX.Element[] = [];

  for (let i = 1; i <= 5; i++) {
    const StarIcon = i <= roundedRate ? AiFillStar : AiOutlineStar;
    const starId = `star-${i}`;

    stars.push(
      <div className="star" id={starId} key={starId} onClick={onClick}>
        <StarIcon />
      </div>
    );
  }
  return stars;
}

export function dateFormat(date: Date): string {
  const newDate = dayjs(date).format("MMM DD, YYYY");
  return newDate;
}
