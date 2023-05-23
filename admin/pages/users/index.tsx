import React, { useState } from "react";
import axios from "axios";
import UserTable from "@/components/UserTable";
import { UserType } from "@/utils/types";
import UserLayout from "@/layouts/UserLayout";
import UserCards from "@/components/UserCards";
import UserEdit from "@/components/UserEdit";

export default function Users({ users }: { users: UserType[] }) {
  const [grid, setGrid] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  return (
    <UserLayout grid={grid} setGrid={setGrid}>
      {grid ? (
        <UserCards users={users} setShow={setShow} />
      ) : (
        <UserTable users={users} setShow={setShow} />
      )}
      ;
      <UserEdit show={show} setShow={setShow} />
    </UserLayout>
  );
}

export async function getStaticProps() {
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_BACK_END_URL}/user/all`
  );
  const users = result.data;
  return {
    props: { users }, // will be passed to the page component as props
  };
}
