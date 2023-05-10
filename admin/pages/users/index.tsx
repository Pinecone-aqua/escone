import React from "react";
import axios from "axios";
import UserTable from "@/components/UserTable";
import { UserType } from "@/utils/types";
import { FiUser } from "react-icons/fi";

export default function Users({ users }: { users: UserType[] }) {
  return <UserTable users={users} />;
}

export async function getStaticProps() {
  const result = await axios.get("http://localhost:3030/user/all");
  const users = result.data;
  return {
    props: { users }, // will be passed to the page component as props
  };
}
