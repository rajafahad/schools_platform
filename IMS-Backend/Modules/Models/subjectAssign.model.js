const mongoose = require("mongoose");

const subjectAssignSchema = new mongoose.Schema({
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'class',
    required: true,
  },

  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Subject',
    required: true,
  },

  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
  },
});

const SubjectAssign = mongoose.model("SubjectAssign", subjectAssignSchema);

module.exports = SubjectAssign;
