const Department = require("../../Models/staffDepartment.model");



// Controller function to handle the logic for retrieving all departments
const getAllDepartments = async (req, res) => {
  const { branchId } = req.user;
  const departments = await Department.find({branchId});
  res.json(departments);
};






// Controller function to handle the logic for creating a new department
const createDepartment = async (req, res) => {
  const { branchId } = req.user;
  const department = await Department.create({branchId, ...req.body});
  res.status(201).json(department);
};





// Controller function to handle the logic for retrieving a specific department
const getDepartmentById = async (req, res) => {
  const department = await Department.findById(req.params.id);
  if (!department) {
    return res.status(404).json({ error: "Department not found" });
  }
  res.json(department);
};






// Controller function to handle the logic for updating a specific department
const updateDepartment = async (req, res) => {
  const department = await Department.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  if (!department) {
    return res.status(404).json({ error: "Department not found" });
  }
  res.json(department);
};






// Controller function to handle the logic for deleting a specific department
const deleteDepartment = async (req, res) => {
  const department = await Department.findByIdAndDelete(req.params.id);
  if (!department) {
    return res.status(404).json({ error: "Department not found" });
  }
  res.sendStatus(204);
};







module.exports = {
  getAllDepartments,
  createDepartment,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};
