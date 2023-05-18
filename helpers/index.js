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

module.exports = {
  verificationStatusEnum,
  getRandomNumber,
};
