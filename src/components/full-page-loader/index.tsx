import React from "react";
import { Backdrop, CircularProgress, useTheme } from "@mui/material";

interface IFullPageLoader {
  open: boolean;
}

const FullPageLoader: React.FC<IFullPageLoader> = (props) => {
  const theme = useTheme();
  return (
    <Backdrop
      style={{ zIndex: theme.zIndex.drawer + 1, color: "#fff" }}
      open={props.open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default FullPageLoader;
