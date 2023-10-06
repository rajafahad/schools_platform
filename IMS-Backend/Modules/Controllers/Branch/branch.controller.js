const Branch = require("../../Models/branch.model");
const createBranchValidation = require("../../validation/createBranch.validation");




// Create a new branch
const createBranch = async (req, res) => {
  await createBranchValidation.validate(req.body,{ abortEarly: false })
  const { userId } = req.user;
  console.log(userId)
  const data = req.body;
  const branch = new Branch({ user:userId, ...data });
  await branch.save();
  res.status(201).json({ success: true, data: branch });
};








// Get all branches
const getAllBranches = async (req, res) => {
  console.log("user------------------------------------------",req.user)
  const { userId } = req.user;
  const branches = await Branch.find({ user:userId })
  console.log(branches)
  res.status(200).json(branches);
};










// Get a single branch
const getBranchById = async (req, res) => {
  const branch = await Branch.findById(req.params.id);
  if (!branch) {
    return res
      .status(404)
      .json({ success: false, message: "Branch not found" });
  }
  res.status(200).json({ success: true, data: branch });
};











// Update a branch
const updateBranch = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const branch = await Branch.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!branch) {
    return res
      .status(404)
      .json({ success: false, message: "Branch not found" });
  }
  res.status(200).json({ success: true, data: branch });
};











// Delete a branch
const deleteBranch = async (req, res) => {
  const branch = await Branch.findByIdAndDelete(req.params.id);
  if (!branch) {
    return res
      .status(404)
      .json({ success: false, message: "Branch not found" });
  }
  res.status(200).json({ success: true, data: {} });
};











module.exports = {
  getAllBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch,
};
