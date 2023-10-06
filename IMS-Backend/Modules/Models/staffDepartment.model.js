const mongoose = require('mongoose');

const staffDepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
  },
}, {
  timestamps: true,
});

const StaffDepartment = mongoose.model('StaffDepartment', staffDepartmentSchema);

module.exports = StaffDepartment;
