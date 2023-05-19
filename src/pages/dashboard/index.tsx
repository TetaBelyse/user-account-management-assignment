import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { USER_ROLE_ENUM } from "../../interfaces";
import User from "./user";

function Dashboard() {
  const { role } = useSelector((state: RootState) => state.user);
  return <div>{role === USER_ROLE_ENUM.USER && <User />}</div>;
}

export default Dashboard;
