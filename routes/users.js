const express = require("express");
const router = express.Router();
const { login, register, verifyEmailAddress } = require("../controllers/users");
// const { uploadImage } = require("../controllers/upload");

const auth = require("../middleware/auth");
const protectRoute = require("../middleware/protectRoutes");

router.post("/login/", login);
router.post("/register/", register);
router.get("/email/verify/:token", verifyEmailAddress);

module.exports = router;
