const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema(
  {
    program: {
      type: String,
      required: [true, "Program is required"],
    },
    name: {
      type: String,
      required: true,
    },
    creditHour: {
      type: Number,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Semester = mongoose.model("Semester", semesterSchema);
module.exports = Semester;
