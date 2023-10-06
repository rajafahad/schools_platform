const mongoose = require("mongoose");

const degreeTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    status: {
      type: Boolean,
      default: 1,
    },
  },
  { timestamps: true }
);

const DegreeType = mongoose.model("DegreeType", degreeTypeSchema);
module.exports = DegreeType;
