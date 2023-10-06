const mongoose = require("mongoose");

const GuardianSchema = new mongoose.Schema(
  {
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Branch is Required"],
    },
    fatherName: {
      type: String,
      required: [true, "Father Name is required"],
    },
    fatherIdNumber: {
      type: String,
    },
    fatherContactNumber: {
      type: String,
    },
    fatherWhatsapp: {
      type: String,
    },

    motherName: {
      type: String,
      required: [true, "Mother Name is required"],
    },

    motherIdNumber: {
      type: String,
    },
    motherContactNumber: {
      type: String,
    },
    motherWhatsapp: {
      type: String,
    },

    guardianName: {
      type: String,
    },
    guardianRelation: {
      type: String,
    },
    guardianIdNumber: {
      type: String,
    },
    guardianContactNumber: {
      type: String,
    },
    guardianWhatsapp: {
      type: String,
    },
  },
  { timestamps: true }
);

const Guardian = mongoose.model("Guardian", GuardianSchema);

module.exports = Guardian;
