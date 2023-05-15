import { dateFormat, starPrinter } from "@/utils/functions";
import { ReviewType } from "@/utils/types";
import axios from "axios";
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
    <div className="review">
      <div className="sub">
        <div className="createdby">
          <picture>
            <img src={review.created_by.image} alt="" />
          </picture>
          <h5>{review.created_by.username}</h5>
        </div>
        <p>{review.content}</p>
      </div>

      <div className="sub">
        <p>{dateFormat(review.created_date)}</p>
        <div className="review-stars">{starPrinter(review.rate)}</div>
        <button onClick={() => confirm2(review._id)}>
          <BsTrashFill />
        </button>
      </div>
    </div>
  );
}
