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
import Pagination from "@/components/Pagination";

export default function Reviews({
  result,
  limit,
}: {
  result: ReviewType[];
  limit: number;
}) {
  const router = useRouter();
  const [visible, setVisible] = useState<string>();
  const toast = useRef<Toast>(null);
  console.log(result);
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
  let totalPages = 1;
  const page = router.query.page ? router.query.page : 1;
  if (result.length < limit) {
    if (result.length == 0) {
      if (page == 1) {
        totalPages = 1;
      } else {
        totalPages = Number(`${page}`) - 1;
        router.query.page = `${totalPages}`;
        router.push({ query: router.query });
      }
    } else {
      totalPages = Number(`${page}`);
    }
  } else {
    totalPages = Number(page) + 1;
  }
  return (
    <div className="children reviews">
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
      <Pagination totalPages={totalPages} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, query } = context;
  const { cookie } = req.headers;
  const limit = 12;
  const token = extractTokenFromCookie(cookie);

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_END_URL}/review/all`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { ...query, limit },
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
        limit,
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
