const express = require("express");
const router = express.Router();
const {
  register,
  login,
  requestReset,
  resetPassword,
} = require("../controllers/auth");
const { googleLogin } = require("../controllers/googleAuth");

router.post("/register", register);
router.post("/login", login);
router.post("/request-password-reset", requestReset);
router.post("/reset-password", resetPassword);
router.post("/google-login", googleLogin);

module.exports = router;
