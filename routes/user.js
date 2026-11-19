const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserDetails,
} = require("../controllers/userController");
const auth = require("../auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/details", auth, getUserDetails);

module.exports = router;