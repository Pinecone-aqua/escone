import { dateFormat, starPrinter } from "@/utils/functions";
import { ReviewType } from "@/utils/types";
import axios from "axios";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import { confirmDialog } from "primereact/confirmdialog";
import { toast } from "react-toastify";

export default function Review({ review }: { review: ReviewType }) {
  const accept = (id: string) => {
    axios
      .delete(`http://localhost:3030/review/${id}`)
      .then(() => toast.success("review deleted"));
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const reject = () => {};

  function confirm2(id: string) {
    confirmDialog({
      message: "Do you want to delete this review?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => accept(id),
      reject,
    });
  }

  return (
    <div className="flex gap-10 py-10 w-full border-b-2 border-gray-300 ">
      <picture className="block w-[60px]">
        <img
          src={review.created_by.image}
          alt=""
          className="w-full rounded-full"
        />
      </picture>
      <div className="w-full flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <p className="text-2xl font-semibold text-primary">
              {review.created_by.username}
            </p>
            <p className="font-semibold text-gray-400">
              {dateFormat(review.created_date)}
            </p>
          </div>
          <div className=" flex text-2xl  flex-col gap-2 items-end ">
            <div className="flex  text-primary ">
              {starPrinter(review.rate)}
            </div>

            <button
              onClick={() => confirm2(review._id)}
              className="text-red-700 border-2 p-2 rounded-xl border-red-700"
            >
              <BsTrashFill />
            </button>
          </div>
        </div>
        <div className="w-full ">
          <p>{review.content}</p>
        </div>
        <div className="flex text-3xl gap-10">
          <div className="flex gap-2 items-center">
            <AiOutlineLike color="green" />
            <span className="text-2xl">10</span>
          </div>
          <div className="flex gap-2 items-center">
            <AiOutlineDislike color="red" />
            <span className="text-2xl">10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
