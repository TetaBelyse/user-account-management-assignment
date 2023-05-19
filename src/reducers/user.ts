import { IUser, IAction } from "../interfaces";
import { SET_USER, RESET_USER } from "../actions/user";

const initialState: IUser = {
  _id: "",
  fName: "",
  lName: "",
  email: "",
  role: "",
  gender: "",
  age: "" as any,
  dob: "",
  nationality: "",
  maritalStatus: "" as any,
  isEmailVerified: false,
  verificationStatus: "" as any,
  identificationNumber: "",
  identificationDocument: "",
  verificationMessage: "",
  profilePhoto: "",
  token: "",
};

const user = (state: IUser = initialState, action: IAction) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...(action.payload as IUser) };
    case RESET_USER:
      return initialState;
    default:
      return state;
  }
};

export default user;
