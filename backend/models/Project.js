const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
    },
    longDescription: {
      type: String, // optional detailed description
    },
    techStack: {
      type: [String], // e.g. ["React", "Node.js", "MongoDB"]
      required: [true, "Tech stack is required"],
    },
    image: {
      type: String, // URL to project screenshot/thumbnail
      required: [true, "Project image URL is required"],
    },
    liveUrl: {
      type: String, // deployed project link
      default: "",
    },
    githubUrl: {
      type: String, // github repo link
      default: "",
    },
    featured: {
      type: Boolean, // show on homepage hero section
      default: false,
    },
    order: {
      type: Number, // control display order
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
