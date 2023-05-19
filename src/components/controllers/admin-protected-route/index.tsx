import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../../reducers";
import { IUser } from "../../../interfaces";

interface IAdminProtectedRouteProps {
  children: ReactNode;
}
const AdminProtectedRoute = ({ children }: IAdminProtectedRouteProps) => {
  const { token, role } = useSelector(
    (state: RootState) => state.user
  ) as IUser;
  return token && token.trim() !== "" && role === "admin" ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

export default AdminProtectedRoute;
