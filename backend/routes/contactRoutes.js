const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getMessages,
  markAsRead,
  deleteMessage,
} = require("../controllers/contactController");
const protect = require("../middleware/authMiddleware");
const { contactLimiter } = require("../middleware/rateLimiters");
const { validateContact } = require("../middleware/validationMiddleware");

// @route   POST /api/contact
// @desc    Send a contact message (visitors)
// @access  Public
router.post("/", contactLimiter, validateContact, sendMessage);

// @route   GET /api/contact
// @desc    Get all messages
// @access  Private (admin only)
router.get("/", protect, getMessages);

// @route   PUT /api/contact/:id/read
// @desc    Mark message as read
// @access  Private (admin only)
router.put("/:id/read", protect, markAsRead);

// @route   DELETE /api/contact/:id
// @desc    Delete a message
// @access  Private (admin only)
router.delete("/:id", protect, deleteMessage);

module.exports = router;
