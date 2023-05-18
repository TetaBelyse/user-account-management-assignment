const express = require("express");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const nodemailer = require("nodemailer");

const auth = require("../middleware/auth");
const protectRoute = require("../middleware/protectRoutes");

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
      res.status(200).json({
        user: {
          ...user._doc,
          password: "",
          emailVerificationToken: "",
          token,
        },
      });
    } else {
      res.status(400).send({ responseMessage: "Wrong username or password" });
    }
  } catch (err) {
    res.status(400).send({
      responseMessage:
        "Something went wrong while signing into your account. Try again later",
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
        (
          fName &&
          lName &&
          email &&
          gender &&
          age &&
          dob &&
          nationality &&
          maritalStatus &&
          password &&
          identificationNumber
        )
        // &&
        // identificationDocument
      )
    ) {
      res.status(400).send({
        status: "Error",
        responseMessage: "Provide correct information",
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
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.GMAIL_ACCOUNT,
            pass: process.env.GMAIL_PASSWORD,
          },
        });

        const mailOptions = {
          from: process.env.GMAIL_ACCOUNT,
          to: oldUser.email,
          subject: "Account verification",
          html: `<b>Dear ${fName}</b>,<p>Thank you for creating an account with us! To get started, we need to verify your email address. Simply click on the link below to complete the verification process:</p>
        <p><a href="${
          process.env.BACKEND_URL +
          "/api/users/email/verify/" +
          emailVerificationToken
        }">Click this link to verify your email</a></p>
        <p>If you are unable to click on the link directly, you can copy and paste it into your web browser's address bar.</p>
        <p>If you did not create an account with us, please ignore this email. If you have any questions or need assistance, our support team is here to help. Feel free to reach out to us at ${
          process.env.GMAIL_ACCOUNT
        }.</p>
        <p>Thank you for choosing our platform!</p>`,
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
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_ACCOUNT,
      to: email,
      subject: "Account verification",
      html: `<b>Dear ${fName}</b>,<p>Thank you for creating an account with us! To get started, we need to verify your email address. Simply click on the link below to complete the verification process:</p>
      <p><a href="${
        process.env.BACKEND_URL +
        "/api/users/email/verify/" +
        emailVerificationToken
      }">Click this link to verify your email</a></p>
      <p>If you are unable to click on the link directly, you can copy and paste it into your web browser's address bar.</p>
      <p>If you did not create an account with us, please ignore this email. If you have any questions or need assistance, our support team is here to help. Feel free to reach out to us at ${
        process.env.GMAIL_ACCOUNT
      }.</p>
      <p>Thank you for choosing our platform!</p>`,
    };

    const sendMail = await transporter.sendMail(mailOptions);

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
      password,
      identificationNumber,
      identificationDocument,
    });

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

    // return new user
    return res.status(201).json({
      status: "success",
      responseMessage:
        "User Registered successfull!. Please check your inbox for email verification instructions",
      user: {
        ...user._doc,
        password: "",
        token,
      },
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
};
