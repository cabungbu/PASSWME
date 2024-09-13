const express = require("express");
const router = express.Router();
const {
  login,
  register,
  takeRefreshToken,
  logout,
} = require("../controller/authController");

router.post("/login", login);
router.post("/register", register);
router.post("/refresh", takeRefreshToken);
router.post("/logout/:id", logout);
module.exports = { routes: router };
