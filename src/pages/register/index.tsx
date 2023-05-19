import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import "../../scss/register.scss";
import { errorHandler, toastMessage } from "../../components/helpers";
import { TOAST_MESSAGE_TYPES } from "../../interfaces";
import { app, appColors } from "../../components/constants";
import { Row, Col } from "react-bootstrap";
import { CircularProgress } from "@mui/material";
import { Home } from "@mui/icons-material";
import Step1 from "./step_1";
import Step2 from "./step_2";

export enum REGISTER_STEPS_ENUM {
  STEP1 = "STEP1",
  STEP2 = "STEP2",
}
export interface IRegisterState {
  fName: string;
  lName: string;
  email: string;
  gender: string;
  age: string;
  dob: string;
  nationality: string;
  maritalStatus: string;
  password: string;
  passwordConfirm: string;
  identificationNumber: string;
  identificationDocument: string;
  image: any;
}

const initialState: IRegisterState = {
  fName: "",
  lName: "",
  email: "",
  gender: "",
  age: "",
  dob: "",
  nationality: "",
  maritalStatus: "",
  password: "",
  identificationNumber: "",
  identificationDocument: "",
  image: undefined,
  passwordConfirm: "",
};
function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(REGISTER_STEPS_ENUM.STEP1);

  const changeHandler = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(state);
    if (state.password.length < 4) {
      toastMessage(
        TOAST_MESSAGE_TYPES.ERROR,
        "Password minimun characters must be 4."
      );
    } else if (state.password !== state.passwordConfirm) {
      toastMessage(TOAST_MESSAGE_TYPES.ERROR, "Passwords do not match.");
    } else {
      setIsSubmitting(true);
      axios
        .post(app.BACKEND_URL + "/users/register/", state)
        .then((res) => {
          setIsSubmitting(false);
          //todo
          navigate("/");
        })
        .catch((error) => {
          setState({ ...state, password: "", passwordConfirm: "" });
          setIsSubmitting(false);
          errorHandler(error);
        });
    }
  };

  return (
    <div className="register-main-container">
      <div className="contents-container">
        <Row>
          <Col md={6} className="shadow">
            <div className="description-container">
              <Link to="/">
                <div className="logo-container shadow">
                  <img
                    src={require("../../assets/logo.png")}
                    alt="logo"
                    style={{ width: 50 }}
                  />
                </div>
              </Link>
              <h1 className="text-white text-center">
                U.A.M.
                <br />
                ASSIGNMENT
              </h1>
              <p className="text-white text-center">
                Lets get you verified with our platform.
              </p>
              <img
                src={require("../../assets/get-started.png")}
                alt=""
                style={{ width: "100%", borderRadius: 10 }}
              />
            </div>
          </Col>
          <Col md={6} className="form-main-container shadow">
            <h3>Create An Account</h3>
            <form onSubmit={handleSubmit}>
              {activeStep === REGISTER_STEPS_ENUM.STEP1 && (
                <Step1
                  state={state}
                  changeHandler={changeHandler}
                  setActiveStep={setActiveStep}
                  isSubmitting={isSubmitting}
                />
              )}
              {activeStep === REGISTER_STEPS_ENUM.STEP2 && (
                <Step2
                  state={state}
                  changeHandler={changeHandler}
                  setActiveStep={setActiveStep}
                  isSubmitting={isSubmitting}
                />
              )}
              <hr />
              <div className="text-center">
                <span>Already have an account?</span>
                <Link
                  style={{ color: appColors.DARK_GREEN, paddingLeft: 5 }}
                  to="/login"
                >
                  Login
                </Link>
              </div>
              <div className="text-center mt-2">
                <Link to="/" style={{ color: appColors.DARK_GREEN }}>
                  <Home /> Go Back To Home
                </Link>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Register;
