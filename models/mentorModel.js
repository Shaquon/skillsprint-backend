// models/Mentor.js

const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    // Add more fields as needed
  },
  { timestamps: true }
);

const Mentor = mongoose.model("Mentor", mentorSchema);

module.exports = Mentor;
