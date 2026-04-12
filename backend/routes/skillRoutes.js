const express = require("express");
const router = express.Router();
const {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} = require("../controllers/skillController");
const protect = require("../middleware/authMiddleware");
const {
  validateSkillCreate,
  validateSkillUpdate,
} = require("../middleware/validationMiddleware");

// @route   GET /api/skills
// @desc    Get all skills
// @access  Public
router.get("/", getSkills);

// @route   POST /api/skills
// @desc    Add a new skill
// @access  Private (admin only)
router.post("/", protect, validateSkillCreate, createSkill);

// @route   PUT /api/skills/:id
// @desc    Update a skill
// @access  Private (admin only)
router.put("/:id", protect, validateSkillUpdate, updateSkill);

// @route   DELETE /api/skills/:id
// @desc    Delete a skill
// @access  Private (admin only)
router.delete("/:id", protect, deleteSkill);

module.exports = router;
