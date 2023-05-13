import dayjs from "dayjs";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export function starPrinter(
  rate: number,
  handler?: React.MouseEventHandler<HTMLDivElement> | undefined
) {
  let result: JSX.Element[] = [];
  let newrate = Math.round(rate);
  for (let i = 1; i <= 5; i++) {
    if (newrate != 0) {
      result = [
        ...result,
        <div className="" id={`${i}`} key={i} onClick={handler}>
          <AiFillStar id={`${i}`} />
        </div>,
      ];
      newrate -= 1;
    } else {
      result = [
        ...result,
        <div className="" id={`${i}`} key={i} onClick={handler}>
          <AiOutlineStar id={`${i}`} />
        </div>,
      ];
    }
  }
  return result;
}

export function dateFormat(date: Date) {
  const newdate = dayjs(date).format("MMM DD, YYYY");
  return newdate;
}
