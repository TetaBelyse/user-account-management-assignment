import axios from "axios";
import { app } from "../components/constants";
import { IUser } from "../interfaces";
import { errorHandler, setHeaders } from "../components/helpers";

export const SET_USER = "SET_USER";
export const RESET_USER = "RESET_USER";

interface IAction {
  type: string;
  payload: any;
}
export const setUser = (user: IUser): IAction => ({
  type: SET_USER,
  payload: user,
});

export const resetUser = () => ({ type: RESET_USER });

export const fetUserStatus = (): any => (dispatch: any, getState: any) => {
  const { user } = getState();
  axios
    .get(app.BACKEND_URL + "/users/status", setHeaders(user.token))
    .then((res) => {
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
    })
    .catch((error) => {
      errorHandler(error);
    });
};
