import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../../scss/login.scss";
import { app, appColors } from "../../components/constants";
import { IUser, TOAST_MESSAGE_TYPES, USER_ROLE_ENUM } from "../../interfaces";
import { errorHandler, toastMessage } from "../../components/helpers";
import { setUser } from "../../actions/user";
import { Home } from "@mui/icons-material";
import FullPageLoader from "../../components/full-page-loader";

const initialState = { emailOrPhone: "", password: "" };
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    axios
      .post(app.BACKEND_URL + "/users/login/", state)
      .then((res) => {
        setIsSubmitting(false);
        const {
          _id,
          fName,
          lName,
          email,
          role,
          gender,
          age,
          dob,
          nationality,
          maritalStatus,
          isEmailVerified,
          verificationStatus,
          identificationNumber,
          identificationDocument,
          verificationMessage,
          profilePhoto,
          token,
        } = res.data;
        dispatch(
          setUser({
            _id,
            fName,
            lName,
            email,
            role,
            gender,
            age,
            dob,
            nationality,
            maritalStatus,
            isEmailVerified,
            verificationStatus,
            identificationNumber,
            identificationDocument,
            verificationMessage,
            profilePhoto,
            token,
          } as IUser)
        );
        toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, "Logged in successful");
        if (role === USER_ROLE_ENUM.ADMIN) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        errorHandler(error);
      });
  };

  return (
    <div className="login-main-container">
      <div className="login-background-container">
        <div></div>
        <div></div>
      </div>
      <div className="form-main-container">
        <Link to="/">
          <img
            src={require("../../assets/logo.png")}
            alt="logo"
            style={{ width: 50 }}
          />
        </Link>

        <div className="form-container">
          <h2>Welcome</h2>
          <p>Login to continue</p>
          <form method="post" onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group">
              <label>Email Or Phone</label>
              <input
                className="form-control"
                placeholder="Enter your email or phone number"
                disabled={isSubmitting}
                type="text"
                name="email"
                value={state.emailOrPhone}
                onChange={(e) =>
                  setState({ ...state, emailOrPhone: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={state.password}
                disabled={isSubmitting}
                onChange={(e) =>
                  setState({ ...state, password: e.target.value })
                }
                required
              />
            </div>
            {isSubmitting ? (
              <button type="button" disabled={true}>
                Logging in...
              </button>
            ) : (
              <button type="submit">Login</button>
            )}
          </form>
          <div className="forget-password-container">
            <Link to="#">Forget password?</Link>
          </div>
          <hr />
          <div className="form-footer2">
            <span>New?</span>
            <Link to="/register">CREATE ACCOUNT</Link>
          </div>
          <div className="text-center mt-2">
            <Link to="/" style={{ color: appColors.DARK_GREEN }}>
              <Home /> Home
            </Link>
          </div>
        </div>
      </div>
      <FullPageLoader open={isSubmitting} />
    </div>
  );
}

export default Login;
