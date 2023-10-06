const Staff = require("../../Models/staff.model");

const getAllStaff = async (req, res) => {
  const { branchId } = req.user;
  const staff = await Staff.find({branchId});
  res.status(200).json(staff);
};






const getStaffById = async (req, res) => {
  const staff = await Staff.findById(req.params.id);
  if (!staff) {
    return res.status(404).json({
      status: "fail",
      message: "Staff not found",
    });
  }
  res.status(200).json(staff);
};







const createStaff = async (req, res) => {
  const { branchId } = req.user;
  const staff = await Staff.create({branchId, ...req.body});
  res.status(201).json(staff);
};






const updateStaff = async (req, res, next) => {
  const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!staff) {
    return res.status(404).json({
      status: "fail",
      message: "Staff not found",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      staff,
    },
  });
};







const deleteStaff = async (req, res, next) => {
  const staff = await Staff.findByIdAndDelete(req.params.id);
  if (!staff) {
    return res.status(404).json({
      status: "fail",
      message: "Staff not found",
    });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
};





module.exports = {
    getAllStaff,
    getStaffById,
    createStaff,
    updateStaff,
    deleteStaff,
}