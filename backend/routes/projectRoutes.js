const express = require("express");
const router = express.Router();
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const protect = require("../middleware/authMiddleware");
const {
  normalizeProjectPayload,
  validateProjectCreate,
  validateProjectUpdate,
} = require("../middleware/validationMiddleware");


// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get("/", getProjects);

// @route   GET /api/projects/:id
// @desc    Get single project
// @access  Public
router.get("/:id", getProject);

// @route   POST /api/projects
// @desc    Create a new project
// @access  Private (admin only)
router.post("/", protect, normalizeProjectPayload, validateProjectCreate, createProject);

// @route   PUT /api/projects/:id
// @desc    Update a project
// @access  Private (admin only)
router.put("/:id", protect, normalizeProjectPayload, validateProjectUpdate, updateProject);

// @route   DELETE /api/projects/:id
// @desc    Delete a project
// @access  Private (admin only)
router.delete("/:id", protect, deleteProject);

module.exports = router;
