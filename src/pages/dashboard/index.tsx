import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { USER_ROLE_ENUM } from "../../interfaces";
import User from "./user";
import Admin from "./admin";

function Dashboard() {
  const { role } = useSelector((state: RootState) => state.user);
  return (
    <div>
      {role === USER_ROLE_ENUM.USER && <User />}
      {role === USER_ROLE_ENUM.ADMIN && <Admin />}
    </div>
  );
}

export default Dashboard;
