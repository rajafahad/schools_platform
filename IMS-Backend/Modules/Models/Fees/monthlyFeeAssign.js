const mongoose = require("mongoose");

const monthlyFeeAssignSchema = mongoose.Schema(
  {
    branch: { // Branch Id
      type: mongoose.Schema.Types.ObjectId,
      ref: "branch",
      required: true,
    },
    student: { // Student Id
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    startingMonth: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
    },
    increment: {
      type: Number,
    },
    tax: {
      type: Number,
    },
  },
  { timestamps: true }
);

const MonthlyFeeAssign = mongoose.model('MonthlyFeeAssign',monthlyFeeAssignSchema);
module.exports = MonthlyFeeAssign;
