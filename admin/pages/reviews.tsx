/* eslint-disable camelcase */
import { ReviewType } from "@/utils/types";
import axios from "axios";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CgArrowsExchangeAltV } from "react-icons/cg";

import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

export default function Reviews({ result }: { result: ReviewType[] }) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState<string>();
  const toast = useRef<Toast>(null);

  function sortHandler(sortItem: string) {
    const query = router.query;
    if (query.order_by == sortItem) {
      if (query.type == "1") {
        router.push({ query: { order_by: sortItem, type: "-1", page: "1" } });
      } else if (query.type == "-1") {
        router.push({ query: {} });
      }
    } else {
      router.push({ query: { order_by: sortItem, type: "1", page: "1" } });
    }
  }

  function deleteReview(id: string) {
    const token = Cookies.get("token");
    axios
      .delete(`${process.env.NEXT_PUBLIC_BACK_END_URL}/review/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        router.reload();
        toast.current?.show({
          severity: "success",
          summary: "Confirmed",
          detail: "You have accepted",
          life: 3000,
        });
      });
  }

  function pageHandler(valid: boolean) {
    const { query } = router;

    if (query.page) {
      if (valid && result.length == 11) {
        query.page = `${Number(query.page) + 1}`;
      } else if (Number(query.page) != 1 || page != 1) {
        query.page = `${Number(query.page) - 1}`;
      }
      setPage(Number(query.page));
      router.push({ query: query });
    } else {
      router.push({ query: { page: 2 } });
      setPage(2);
    }
  }
  return (
    <div className="children reviews">
      <div className="flex gap-4 w-full justify-center  font-semibold items-center">
        <input
          type="button"
          value="<"
          onClick={() => pageHandler(false)}
          className="py-1 px-3 bg-blue-700 text-white rounded-full"
        />
        <p className="text-lg">{page}</p>
        <input
          type="button"
          value=">"
          onClick={() => {
            pageHandler(true);
          }}
          className="py-1 px-3 bg-blue-700 text-white rounded-full"
        />
      </div>
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500 ">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Created by
            </th>
            <th
              scope="col"
              onClick={() => sortHandler("rate")}
              className="px-6 py-4 font-medium text-gray-900 flex"
            >
              rate
              <p className="text-2xl">
                <CgArrowsExchangeAltV />
              </p>
            </th>

            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              content
            </th>
            <th
              scope="col"
              onClick={() => sortHandler("created_date")}
              className="px-6 py-4 font-medium text-gray-900 flex items-center"
            >
              Date
              <p className="text-2xl">
                <CgArrowsExchangeAltV />
              </p>
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Recipe id
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              delete
            </th>
          </tr>
        </thead>
        <tbody>
          {result.map((review) => (
            <tr className="hover:bg-gray-50" key={review._id}>
              <td className="px-6 py-4 text-black">{review.created_by}</td>
              <td className="px-6 py-4">{review.rate}</td>
              <td className="px-6 py-4">{review.content}</td>
              <td className="px-6 py-4">
                {dayjs(review.created_date).format("YYYY MMM/DD")}
              </td>
              <td className="px-6 py-4">{review.recipe_id}</td>
              <td className="px-6 py-4">
                <Toast ref={toast} />
                <ConfirmDialog
                  visible={visible == review._id}
                  onHide={() => setVisible(undefined)}
                  message="Are you sure you want to delete?"
                  header="Confirmation"
                  icon="pi pi-exclamation-triangle"
                  accept={() => deleteReview(review._id)}
                  reject={() =>
                    toast.current?.show({
                      severity: "warn",
                      summary: "Rejected",
                      detail: "You have rejected",
                      life: 3000,
                    })
                  }
                />
                <p
                  onClick={() => setVisible(review._id)}
                  className="text-xl text-red-500"
                >
                  {" "}
                  <AiOutlineDelete />
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, query } = context;
  const { cookie } = req.headers;
  const token = extractTokenFromCookie(cookie);

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_END_URL}/review/all`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: query,
      }
    );

    const result = response.data;

    return {
      props: {
        result,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        result: null,
      },
    };
  }
};

function extractTokenFromCookie(cookie: string | undefined) {
  const match = cookie?.match(/token=([^;]+)/);
  const token = match?.[1];

  return token;
}
