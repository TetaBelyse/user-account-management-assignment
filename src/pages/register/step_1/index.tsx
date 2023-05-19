import React from "react";
import { IRegisterState, REGISTER_STEPS_ENUM } from "..";
import { MARITAL_STATUS_ENUM } from "../../../interfaces";
import countriesList from "../../../countries.json";

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
              <option value="">choose gender</option>
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
