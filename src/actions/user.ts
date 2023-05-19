import { IUser } from "../interfaces";

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
