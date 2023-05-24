import React, { useState } from "react";
import axios from "axios";
import UserTable from "@/components/UserTable";
import { UserType } from "@/utils/types";
import UserLayout from "@/layouts/UserLayout";
import UserCards from "@/components/UserCards";
import UserEdit from "@/components/UserEdit";
import Pagination from "@/components/Pagination";

export default function Users({ users }: { users: UserType[] }) {
  const [grid, setGrid] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="users children">
      <UserLayout grid={grid} setGrid={setGrid}>
        {grid ? (
          <UserCards users={users} setShow={setShow} />
        ) : (
          <UserTable users={users} setShow={setShow} />
        )}
        <Pagination totalPages={10} />
        <UserEdit show={show} setShow={setShow} />
      </UserLayout>
    </div>
  );
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps({ query }: any) {
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_BACK_END_URL}/user/all`,
    { params: query }
  );
  const users = result.data;
  return {
    props: { users },
  };
}
