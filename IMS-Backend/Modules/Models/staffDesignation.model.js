const mongoose = require('mongoose');

const staffDesignationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branch',
      required: true,
    },
  },
  { timestamps: true }
);

const StaffDesignation = mongoose.model('StaffDesignation', staffDesignationSchema);

module.exports = StaffDesignation;
