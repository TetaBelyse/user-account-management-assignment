const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/users");
// const { uploadImage } = require("../controllers/upload");

const auth = require("../middleware/auth");
const protectRoute = require("../middleware/protectRoutes");

router.post("/login/", login);
router.post("/register/", register);

module.exports = router;
