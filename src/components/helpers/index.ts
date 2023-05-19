import { toast } from "react-toastify";
import { TOAST_MESSAGE_TYPES } from "../../interfaces";

export const handleAuthError = (error: any) => {
  if (error?.response?.status === 401) {
    //@ts-ignore
    window.location = "/logout";
    //@ts-ignore
  }
};

export const returnErroMessage = (error: any) => {
  if (error?.response?.data?.responseMessage) {
    return error.response.data.responseMessage;
  } else if (error.message) {
    return error.message;
  } else {
    return error;
  }
};

export const toastMessage = (type: TOAST_MESSAGE_TYPES, message: string) => {
  if (type === TOAST_MESSAGE_TYPES.INFO) {
    toast.info(message);
  }
  if (type === TOAST_MESSAGE_TYPES.ERROR) {
    toast.error(message);
  }
  if (type === TOAST_MESSAGE_TYPES.SUCCESS) {
    toast.success(message);
  }
};

export const errorHandler = (error: any) => {
  if (error?.response?.data?.responseMessage) {
    toastMessage(
      TOAST_MESSAGE_TYPES.ERROR,
      error.response.data.responseMessage
    );
  } else {
    toastMessage(TOAST_MESSAGE_TYPES.ERROR, error.message);
  }
  handleAuthError(error);
};

export const setHeaders = (token: string) => {
  return {
    headers: {
      token: token,
    },
  };
};
