import React from "react";

import "../../scss/register.scss";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

function RegisterSuccess() {
  return (
    <div className="register-success-main-container ">
      <div className="card shadow">
        <div className="card-body">
          <CheckCircle fontSize="large" color="success" />
          <h2 className="text-success">
            Your account has been registered successfull, please check your
            inbox to verify your email
          </h2>
          <Link to="/login">
            <button className="btn btn-info mt-3">Login Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterSuccess;
