const StaffDesignation = require("../../Models/staffDesignation.model");



// Controller function to create a new staff designation
exports.createStaffDesignation = async (req, res) => {
  const { branchId } = req.user;
  const staffDesignation = new StaffDesignation({branchId, ...req.body});
  await staffDesignation.save();
  res.status(201).json(staffDesignation);
};



// Controller function to retrieve all staff designations
exports.getAllStaffDesignations = async (req, res) => {
  const { branchId } = req.user;
  const staffDesignations = await StaffDesignation.find({branchId});
  res.json(staffDesignations);
};

// Controller function to retrieve a single staff designation by ID
exports.getStaffDesignationById = async (req, res) => {
  const staffDesignation = await StaffDesignation.findById(req.params.id);
  if (!staffDesignation) {
    return res.status(404).json({ error: "Staff designation not found" });
  }
  res.json(staffDesignation);
};

// Controller function to update a staff designation by ID
exports.updateStaffDesignation = async (req, res) => {
  const { name, branch_id } = req.body;
  const staffDesignation = await StaffDesignation.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!staffDesignation) {
    return res.status(404).json({ error: "Staff designation not found" });
  }
  res.json(staffDesignation);
};

// Controller function to delete a staff designation by ID
exports.deleteStaffDesignation = async (req, res) => {
  const staffDesignation = await StaffDesignation.findByIdAndRemove(
    req.params.id
  );
  if (!staffDesignation) {
    return res.status(404).json({ error: "Staff designation not found" });
  }
  res.sendStatus(204);
};
