import { dateFormat, starPrinter } from "@/utils/functions";
import { ReviewType } from "@/utils/types";
import { BsTrashFill } from "react-icons/bs";
import { confirmDialog } from "primereact/confirmdialog";
import { useUser } from "@/context/userContext";

export default function Review({
  review,
  deleteReviewHandler,
}: {
  review: ReviewType;
  deleteReviewHandler: (id: string) => void;
}) {
  const { user } = useUser();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const reject = () => {};

  function confirm2(id: string) {
    confirmDialog({
      message: "Та энэ үнэлгээг устгахыг хүсч байна уу?",
      header: "Устгах зөвшөөрөл",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => deleteReviewHandler(id),
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
        <div className="review-stars">{starPrinter({ rate: review.rate })}</div>
        <button
          onClick={() => confirm2(review._id)}
          disabled={user?._id != review.created_by._id}
        >
          <BsTrashFill />
        </button>
      </div>
    </div>
  );
}
