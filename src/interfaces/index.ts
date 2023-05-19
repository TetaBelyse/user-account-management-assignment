export interface IUser {
  _id: string;
  fName: string;
  lName: string;
  email: string;
  role: string;
  gender: string;
  age: number;
  dob: string;
  nationality: string;
  maritalStatus: MARITAL_STATUS_ENUM;
  isEmailVerified: boolean;
  verificationStatus: VERIFICATION_STATUS_ENUM;
  identificationNumber: string;
  identificationDocument: string;
  verificationMessage: string;
  profilePhoto: string;
  token: string;
}

export enum VERIFICATION_STATUS_ENUM {
  UNVERIFIED = "UNVERIFIED",
  PENDING_VERIFICATION = "PENDING VERIFICATION",
  VERIFIED = "VERIFIED",
}

export enum MARITAL_STATUS_ENUM {
  SINGLE = "SINGLE",
  MARRIED = "MARRIED",
  DIVORCED = "DIVORCED",
  WIDOWED = "WIDOWED",
}

export interface IAction {
  type: string;
  payload: any;
}

export enum TOAST_MESSAGE_TYPES {
  ERROR = "error",
  INFO = "info",
  SUCCESS = "success",
}
