const express = require("express");
const router = express.Router();
const {
  login,
  register,
  verifyEmailAddress,
  updateUserProfileImage,
  getUserStatus,
  adminGetAll,
  disapproveUser,
  approveUser,
} = require("../controllers/users");
// const { uploadImage } = require("../controllers/upload");

const auth = require("../middleware/auth");
const protectRoute = require("../middleware/protectRoutes");

router.get("/all", auth, protectRoute(["admin"]), adminGetAll);
router.put("/approve", auth, protectRoute(["admin"]), approveUser);
router.put("/disapprove", auth, protectRoute(["admin"]), disapproveUser);
router.post("/login/", login);
router.post("/register/", register);
router.get("/email/verify/:token", verifyEmailAddress);
router.put("/profile/", auth, updateUserProfileImage);
router.get("/status/", auth, getUserStatus);

module.exports = router;
