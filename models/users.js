const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: [true, "Provide your firstname"],
    },
    lName: {
      type: String,
      required: [true, "Provide your lastname"],
    },
    email: {
      type: String,
      required: [true, "Provide email"],
      unique: [true, "your email is already used"],
      match: [
        /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        "Provide a Valid Email",
      ],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      lowercase: true,
      default: "user",
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    age: {
      type: Number,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    maritalStatus: {
      type: String,
      required: true,
      enum: ["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"],
    },
    password: {
      type: String,
      required: [true, "Provide password"],
      minlength: 8,
      // select: false,
    },
    emailVerificationToken: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    verificationStatus: {
      type: String,
      required: true,
      enum: ["UNVERIFIED", "PENDING VERIFICATION", "VERIFIED"],
      default: "PENDING VERIFICATION",
    },
    identificationNumber: {
      type: String,
      default: "",
    },
    identificationDocument: {
      type: String,
      default: "",
    },
    profilePhoto: {
      type: String,
      default: "",
    },
    verificationMessage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
