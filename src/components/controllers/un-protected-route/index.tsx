import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { IUser, USER_ROLE_ENUM } from "../../../interfaces";
import { RootState } from "../../../reducers";

const UnProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { token, role, apply, shopId } = useSelector(
    (state: RootState) => state.user as IUser
  );
  console.log({ token, role, apply, shopId });
  return !token || token.trim() === "" ? (
    children
  ) : role === USER_ROLE_ENUM.ADMIN ? (
    <Navigate to="/dashboard/main" />
  ) : (
    <>
      {shopId === null && apply === true ? (
        <Navigate to="/apply" />
      ) : (
        <Navigate to="/dashboard" />
      )}
    </>
  );
};

export default UnProtectedRoute;
