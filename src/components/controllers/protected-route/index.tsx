import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../../reducers";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useSelector((state: RootState) => state.user);
  return token && token.trim() !== "" ? (
    children
  ) : (
    <Navigate to="/login-register" />
  );
};

export default ProtectedRoute;
