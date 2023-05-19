const express = require("express");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const nodemailer = require("nodemailer");

const { returnEmailBody } = require("../helpers");
const Users = require("../models/users");

const login = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res
        .status(400)
        .send({ responseMessage: "Please provide your email and password" });
    }
    // Validate if user exist in our database
    const user = await Users.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      if (!user.isEmailVerified) {
        res.status(400).send({
          responseMessage:
            "Your email address is not verified. Please check your inbox to veriry your email address.",
        });
      }
      // Create token
      const token = jwt.sign(
        {
          userId: user._id,
          email,
          createdAt: user.createdAt,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: process.env.TOKEN_EXPIRATION,
        }
      );

      // user
      return res.status(200).json({
        user: {
          ...user._doc,
          password: "",
          emailVerificationToken: "",
          token,
        },
      });
    } else {
      return res
        .status(400)
        .send({ responseMessage: "Wrong username or password" });
    }
  } catch (err) {
    console.log({ err });
    res.status(400).send({
      responseMessage:
        "Something went wrong while signing into your account. Try again later",
    });
  }
};

const verifyEmailAddress = async (req, res) => {
  try {
    const token = req.params["token"];
    const user = await Users.findOne({
      emailVerificationToken: token,
      isEmailVerified: false,
    });

    if (!user) {
      return res.status(400).send({
        responseMessage:
          "verification token expired, please log into your account or request new token by trying to register your account again using the same email and password.",
      });
    }
    const resps = await Users.updateOne(
      {
        _id: user._id,
      },
      { isEmailVerified: true, emailVerificationToken: "" }
    );
    return res.redirect(process.env.FRONTEND_URL + "/login");
  } catch (error) {
    return res.status(400).send({
      responseMessage: error.message,
    });
  }
};

const register = async (req, res) => {
  try {
    // Get user input
    const {
      fName,
      lName,
      email,
      gender,
      age,
      dob,
      nationality,
      maritalStatus,
      password,
      identificationNumber,
      identificationDocument,
    } = req.body;

    // Validate user input
    if (
      !(
        fName &&
        lName &&
        email &&
        gender &&
        age &&
        dob &&
        nationality &&
        maritalStatus &&
        password &&
        identificationNumber &&
        identificationDocument
      )
    ) {
      return res.status(400).send({
        status: "Error",
        responseMessage: "Provide correct information",
      });
    }
    //validate pwd
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValid = regex.test(password);
    if (!isValid) {
      return res.status(400).send({
        status: "Error",
        responseMessage:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      });
    }

    const emailVerificationToken = uuidv4();

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await Users.findOne({ email });

    if (oldUser) {
      if (!oldUser.isEmailVerified) {
        //resend emailVerificationToken token
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          secure: true,
          auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
          },
        });

        const mailOptions = {
          from: process.env.SMTP_EMAIL,
          to: oldUser.email,
          subject: "Account verification",
          html: returnEmailBody(fName, emailVerificationToken),
        };
        await transporter.sendMail(mailOptions);
        await Users.updateOne(
          {
            emailVerificationToken,
          },
          { _id: oldUser._id }
        );

        return res.status(200).send({
          responseMessage:
            "Dear " +
            fName +
            ", we have resend you an email verification link to your email. Plese check your inbox and verify your email address",
        });
      } else {
        return res.status(409).send({
          responseMessage:
            "Email already exists, please login into your account or use password reset link if you don't remeber your account's password.",
        });
      }
    }

    //send verification message
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "Account verification",
      html: returnEmailBody(fName, emailVerificationToken),
    };

    const hashedPwd = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await Users.create({
      fName,
      lName,
      email: email.toLowerCase(),
      gender,
      age,
      dob,
      emailVerificationToken,
      nationality,
      maritalStatus,
      password: hashedPwd,
      identificationNumber,
      identificationDocument,
    });

    await transporter.sendMail(mailOptions);

    // return new user
    return res.status(201).json({
      status: "success",
      responseMessage:
        "User Registered successfull!. Please check your inbox for email verification instructions",
    });
  } catch (err) {
    return res.status(400).send({
      responseMessage: err.message,
    });
  }
};

module.exports = {
  login,
  register,
  verifyEmailAddress,
};
