import React from "react";
import { CircularProgress } from "@mui/material";
import "./loader.scss";

const MiniLoader = () => (
  <div className="fallback-spinner" style={{ height: "20vh" }}>
    <div className="loading" style={{ top: "20%" }}>
      <CircularProgress />
    </div>
  </div>
);
export default MiniLoader;
