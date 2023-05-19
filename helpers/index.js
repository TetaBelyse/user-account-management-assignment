const crypto = require("crypto");

const verificationStatusEnum = {
  UNVERIFIED: "UNVERIFIED",
  PENDING_VERIFICATION: "PENDING VERIFICATION",
  VERIFIED: "VERIFIED",
};

const getRandomNumber = () => {
  const max = 999999;
  const min = 111111;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const returnEmailBody = (fName, emailVerificationToken) => {
  return `<b>Dear ${fName}</b>,<p>Thank you for creating an account with us! To get started, we need to verify your email address. Simply click on the link below to complete the verification process:</p>
  <p><a href="${
    process.env.BACKEND_URL +
    "/api/users/email/verify/" +
    emailVerificationToken
  }">Click this link to verify your email</a></p>
  <p><b>NB: You will be redirected to a login page upon a successfull email verification.</b></p>
  <p>If you are unable to click on the link directly, you can copy and paste it into your web browser's address bar.</p>
  <p>If you did not create an account with us, please ignore this email.</p>
  <p>Best Regards,<br>Teta Belyse</p>`;
};

const returnEmailVerifiedBody = (fName) => {
  return `<b>Dear ${fName}</b>,<p>Your account has been verified successfully.</p>
  <p><a href="${
    process.env.FRONTEND_URL + "/login"
  }">Click this link to log into your account</a></p>
  <p>Best Regards,<br>Teta Belyse</p>`;
};

const returnEmailNotVerifiedBody = (fName, reason) => {
  return `<b>Dear ${fName}</b>,<p>Your account is unverified because <b>${reason}</b>.</p>
  <p>Best Regards,<br>Teta Belyse</p>`;
};

const returnOTPEmailBody = (fName, code) => {
  return `<b>Dear ${fName}</b>,<p>Your OTP code to log into your accout is: <b>${reason}</b>.</p>
  <p>Best Regards,<br>Teta Belyse</p>`;
};

module.exports = {
  verificationStatusEnum,
  getRandomNumber,
  returnEmailBody,
  returnEmailVerifiedBody,
  returnEmailNotVerifiedBody,
  returnOTPEmailBody,
};
