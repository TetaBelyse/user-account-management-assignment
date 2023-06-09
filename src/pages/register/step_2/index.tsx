import React from "react";
import { IRegisterState, REGISTER_STEPS_ENUM } from "..";

interface IStepProps {
  state: IRegisterState;
  setState: any;
  changeHandler: any;
  setActiveStep: any;
  isSubmitting: boolean;
}

function Step2({
  state,
  setState,
  changeHandler,
  setActiveStep,
  isSubmitting,
}: IStepProps) {
  return (
    <div>
      <div className="form-group">
        <label>ID/Pasport Number</label>
        <input
          type="number"
          placeholder="Enter ID/Passport Number"
          value={state.identificationNumber}
          className="form-control"
          onChange={changeHandler}
          name="identificationNumber"
        />
      </div>
      <div className="form-group">
        <label>ID/Pasport Document</label>
        <input
          type="file"
          onChange={(t: any) =>
            setState({
              ...state,
              identificationDocument: t.target.files[0],
            })
          }
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          value={state.password}
          placeholder="Enter password"
          onChange={changeHandler}
          name="password"
        />
      </div>

      <div className="form-group">
        <label>Confirm Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Confirm your password"
          value={state.passwordConfirm}
          onChange={changeHandler}
          name="passwordConfirm"
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          type="button"
          onClick={() => setActiveStep(REGISTER_STEPS_ENUM.STEP1)}
        >
          Back
        </button>
        <button type="submit" style={{ marginLeft: 5 }}>
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Step2;
