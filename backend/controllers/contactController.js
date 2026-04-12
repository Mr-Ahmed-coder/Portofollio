const Contact = require("../models/Contact");

// @desc    Send a contact message (public visitor)
// @route   POST /api/contact
// @access  Public
const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contact = await Contact.create({ name, email, subject, message });
    res.status(201).json({ success: true, message: "Message sent successfully!", contact });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all messages (admin)
// @route   GET /api/contact
// @access  Private
const getMessages = async (req, res) => {
  try {
    // Show unread messages first, then by newest
    const messages = await Contact.find().sort({ isRead: 1, createdAt: -1 });
    const unreadCount = await Contact.countDocuments({ isRead: false });

    res.status(200).json({
      success: true,
      count: messages.length,
      unreadCount,
      messages,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Mark message as read
// @route   PUT /api/contact/:id/read
// @access  Private
const markAsRead = async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    message.isRead = true;
    await message.save();

    res.status(200).json({ success: true, message: "Marked as read", contact: message });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete a message
// @route   DELETE /api/contact/:id
// @access  Private
const deleteMessage = async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    await message.deleteOne();
    res.status(200).json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { sendMessage, getMessages, markAsRead, deleteMessage };
