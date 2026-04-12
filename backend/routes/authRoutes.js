const express = require("express");
const router = express.Router();
const { login, getMe } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const { authLimiter } = require("../middleware/rateLimiters");
const { validateLogin } = require("../middleware/validationMiddleware");

// @route   POST /api/auth/login
// @desc    Login admin & get token
// @access  Public
router.post("/login", authLimiter, validateLogin, login);

// @route   GET /api/auth/me
// @desc    Get logged in admin info
// @access  Private
router.get("/me", protect, getMe);

module.exports = router;
