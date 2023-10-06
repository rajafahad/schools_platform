const mongoose = require("mongoose");

const monthlyFeePaidSchema = mongoose.Schema(
  {
    branch: {
      //Branch Id
      type: mongoose.Schema.Types.ObjectId,
      ref: "branch",
      required: true,
    },
    student: {
      // Student Id
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
      required: true,
    },
    month: {
      // like March
      type: String,
      required: true,
    },
    MonthlyFee: {
      // Monthly Fee Assign to Student
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paidAmount: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    fine: {
      type: Number,
    },
    tax: {
      type: Number,
    },
  },
  { timestamps: true }
);

const monthlyFeePaid = mongoose.model("monthlyFeePaid", monthlyFeePaidSchema);
module.exports = monthlyFeePaid;
