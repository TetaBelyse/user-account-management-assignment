import "./loader.scss";
import { CircularProgress } from "@mui/material";

const Loader = () => (
  <div className="fallback-spinner">
    <div className="loading">
      <CircularProgress />
    </div>
  </div>
);
export default Loader;
