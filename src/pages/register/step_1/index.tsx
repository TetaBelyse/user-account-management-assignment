import React from "react";
import { IRegisterState, REGISTER_STEPS_ENUM } from "..";
import { MARITAL_STATUS_ENUM, TOAST_MESSAGE_TYPES } from "../../../interfaces";
import countriesList from "../../../countries.json";
import { toastMessage } from "../../../components/helpers";

interface IStepProps {
  state: IRegisterState;
  changeHandler: any;
  setActiveStep: any;
  isSubmitting: boolean;
}
function Step1({
  state,
  changeHandler,
  setActiveStep,
  isSubmitting,
}: IStepProps) {
  const handleContinue = () => {
    if (state.fName.trim() === "") {
      toastMessage(TOAST_MESSAGE_TYPES.ERROR, "Firstname is required");
      return;
    }
    if (state.lName.trim() === "") {
      toastMessage(TOAST_MESSAGE_TYPES.ERROR, "LastName is required");
      return;
    }
    if (state.email.trim() === "") {
      toastMessage(TOAST_MESSAGE_TYPES.ERROR, "Email address is required");
      return;
    }
    if (state.gender.trim() === "") {
      toastMessage(TOAST_MESSAGE_TYPES.ERROR, "Gender address is required");
      return;
    }
    if (state.maritalStatus.trim() === "") {
      toastMessage(TOAST_MESSAGE_TYPES.ERROR, "Marital status  is required");
      return;
    }
    if (state.age.trim() === "") {
      toastMessage(TOAST_MESSAGE_TYPES.ERROR, "Your age is required");
      return;
    }
    if (state.dob.trim() === "") {
      toastMessage(TOAST_MESSAGE_TYPES.ERROR, "Your Date of birth is required");
      return;
    }
    if (state.nationality.trim() === "") {
      toastMessage(
        TOAST_MESSAGE_TYPES.ERROR,
        "Please choose your natinality is required"
      );
      return;
    }
    setActiveStep(REGISTER_STEPS_ENUM.STEP2);
  };
  return (
    <div>
      <div className="row">
        <div className="col-6">
          <div className="form-group ">
            <label>FirstName</label>
            <input
              className="form-control"
              placeholder="Enter your full name"
              disabled={isSubmitting}
              type="text"
              name="fName"
              value={state.fName}
              required
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <label>LastName</label>
            <input
              className="form-control"
              placeholder="Enter your full name"
              disabled={isSubmitting}
              type="text"
              name="lName"
              value={state.lName}
              required
              onChange={changeHandler}
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <label>Email Address</label>
        <input
          className="form-control"
          placeholder="Enter your email"
          disabled={isSubmitting}
          type="email"
          name="email"
          value={state.email}
          onChange={changeHandler}
          required
        />
      </div>
      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <label>Gender</label>
            <select
              required
              className="form-select"
              disabled={isSubmitting}
              onChange={changeHandler}
              value={state.gender}
              name="gender"
            >
              <option value="">choose gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <label>Marital status</label>
            <select
              required
              className="form-select"
              disabled={isSubmitting}
              onChange={changeHandler}
              value={state.maritalStatus}
              name="maritalStatus"
            >
              <option value="">choose Marital status</option>
              <option value={MARITAL_STATUS_ENUM.SINGLE}>
                {MARITAL_STATUS_ENUM.SINGLE}
              </option>
              <option value={MARITAL_STATUS_ENUM.MARRIED}>
                {MARITAL_STATUS_ENUM.MARRIED}
              </option>
              <option value={MARITAL_STATUS_ENUM.DIVORCED}>
                {MARITAL_STATUS_ENUM.DIVORCED}
              </option>
              <option value={MARITAL_STATUS_ENUM.WIDOWED}>
                {MARITAL_STATUS_ENUM.WIDOWED}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              required
              placeholder="Enter your age"
              className="form-control"
              disabled={isSubmitting}
              onChange={changeHandler}
              value={state.age}
              name="age"
            />
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <label>Date Of Birth</label>
            <input
              type="date"
              required
              className="form-control"
              disabled={isSubmitting}
              onChange={changeHandler}
              value={state.dob}
              name="dob"
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Nationality</label>
        <select
          className="form-select"
          required
          value={state.nationality}
          onChange={changeHandler}
          name="nationality"
        >
          <option value="">Choose Nationality</option>
          {countriesList.map((item) => (
            <option value={item.name}>{item.name}</option>
          ))}
        </select>
      </div>

      <button type="button" onClick={() => handleContinue()}>
        Continue
      </button>
    </div>
  );
}

export default Step1;
