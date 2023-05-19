import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../../scss/login.scss";
import { app, appColors } from "../../components/constants";
import { IUser, TOAST_MESSAGE_TYPES } from "../../interfaces";
import { errorHandler, toastMessage } from "../../components/helpers";
import { setUser } from "../../actions/user";
import { Home } from "@mui/icons-material";
import FullPageLoader from "../../components/full-page-loader";

const initialState = { email: "", password: "", otp: "" };
enum LOGIN_STEPS_ENUM {
  CREDENTIALS = "CREDENTIALS",
  OTP = "OTP",
}
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(LOGIN_STEPS_ENUM.CREDENTIALS);
  const handleSubmit0 = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    axios
      .post(app.BACKEND_URL + "/users/login/init/", state)
      .then((res) => {
        setIsSubmitting(false);
        setActiveStep(LOGIN_STEPS_ENUM.OTP);
      })
      .catch((error) => {
        setIsSubmitting(false);
        errorHandler(error);
      });
  };
  const handleResendToken = () => {
    setIsSubmitting(true);
    axios
      .post(app.BACKEND_URL + "/users/resendotp/", state)
      .then((res) => {
        setIsSubmitting(false);
        setState({ ...state, otp: "" });
        toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.responseMessage);
      })
      .catch((error) => {
        setIsSubmitting(false);
        errorHandler(error);
      });
  };
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
        } = res.data.user;
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

        navigate("/dashboard");
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
          {activeStep === LOGIN_STEPS_ENUM.CREDENTIALS && (
            <>
              <form method="post" onSubmit={(e) => handleSubmit0(e)}>
                <div className="form-group">
                  <label>Email address</label>
                  <input
                    className="form-control"
                    placeholder="Enter your email"
                    disabled={isSubmitting}
                    type="text"
                    name="email"
                    value={state.email}
                    onChange={(e) =>
                      setState({ ...state, email: e.target.value })
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
            </>
          )}
          {activeStep === LOGIN_STEPS_ENUM.OTP && (
            <form method="post" onSubmit={(e) => handleSubmit(e)}>
              <div className="form-group">
                <label>Please enter an OTP code sent to : {state.email}</label>
                <input
                  className="form-control"
                  placeholder="Enter OTP Code"
                  disabled={isSubmitting}
                  type="number"
                  name="otp"
                  value={state.otp}
                  onChange={(e) => setState({ ...state, otp: e.target.value })}
                  required
                />
              </div>
              {isSubmitting ? (
                <button type="button" disabled={true}>
                  Verifying...
                </button>
              ) : (
                <button type="submit">Verify OTP</button>
              )}
              <button
                type="button"
                style={{
                  background: "transparent",
                  color: appColors.DARK_GREEN,
                }}
                onClick={() => handleResendToken()}
              >
                Resend OTP
              </button>
            </form>
          )}
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
