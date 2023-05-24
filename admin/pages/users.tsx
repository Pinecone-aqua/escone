import React, { useState } from "react";
import axios from "axios";
import UserTable from "@/components/UserTable";
import { UserType } from "@/utils/types";
import UserLayout from "@/layouts/UserLayout";
import UserCards from "@/components/UserCards";
import UserEdit from "@/components/UserEdit";
import Pagination from "@/components/Pagination";
import { useRouter } from "next/router";

export default function Users({
  users,
  limit,
}: {
  users: UserType[];
  limit: number;
}) {
  const [grid, setGrid] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();
  let totalPages = 1;
  const page = router.query.page ? router.query.page : 1;
  if (users.length < limit) {
    if (users.length == 0) {
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
    <div className="users children">
      <UserLayout grid={grid} setGrid={setGrid}>
        {grid ? (
          <UserCards users={users} setShow={setShow} />
        ) : (
          <UserTable users={users} setShow={setShow} />
        )}
        <Pagination totalPages={totalPages} />
        <UserEdit show={show} setShow={setShow} />
      </UserLayout>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps({ query }: any) {
  const limit = 8;
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_BACK_END_URL}/user/all`,
    { params: { ...query, limit: limit } }
  );
  const users = result.data;

  return {
    props: { users, limit },
  };
}
