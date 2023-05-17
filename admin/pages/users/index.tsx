import React, { useState } from "react";
import axios from "axios";
import UserTable from "@/components/UserTable";
import { UserType } from "@/utils/types";
import UserLayout from "@/components/UserLayout";
import UserCards from "@/components/UserCards";

export default function Users({ users }: { users: UserType[] }) {
  const [grid, setGrid] = useState(false);

  return (
    <UserLayout grid={grid} setGrid={setGrid}>
      {grid ? <UserCards users={users} /> : <UserTable users={users} />};
    </UserLayout>
  );
}

export async function getStaticProps() {
  const result = await axios.get(`${process.env.BACK_END_URL}/user/all`);
  const users = result.data;
  return {
    props: { users }, // will be passed to the page component as props
  };
}
