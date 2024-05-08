const express = require("express");
const router = express.Router();
const {
  login,
  logout,
  passportLogin,
} = require("../controllers/authController");
const passport = require("passport");
const corsMiddleware = require("../middlewares/createCorsMiddleware");

// Add CORS middleware to all routes
router.use(corsMiddleware);

const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

// Login
router.post("/login", login);

router.get("/login/success", passportLogin);

router.get("/logout", logout);

router.get("/google", googleAuth);

router.get('/google/callback', passport.authenticate("google", {
  successRedirect: `${process.env.CLIENT_URL}`,
  failureRedirect: `${process.env.CLIENT_URL}/login`,
  failureFlash: true
}));

module.exports = router;
