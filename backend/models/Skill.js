const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Skill name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Frontend", "Backend", "Database", "DevOps", "Tools", "Other"],
    },
    proficiency: {
      type: Number,
      min: 1,
      max: 100, // percentage for progress bar on frontend
      default: 80,
    },
    iconUrl: {
      type: String, // optional icon/logo for the skill
      default: "",
    },
    order: {
      type: Number, // control display order within category
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema);
