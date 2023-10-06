const DegreeType = require("Modules/Models/degreeType.model");


const createDegreeType = async (req, res) => {
  const { name, branch, status } = req.body;

  for (const branchId of branch) {
    const newDegreeType = DegreeType({
      name,
      status,
      branch: branchId,
    });
    await newDegreeType.save();
  }
  res
    .status(201)
    .json({ success: true, message: "DegreeType Successfully Created" });
};

const getAllDegreeType = async (req, res) => {
  const DegreeTypes = await DegreeType.find().populate({
    path: "branch",
    select: "branchName -_id",
  });
  res.send(DegreeTypes);
};

const updateDegreeType = async (req, res) => {
  const id = req.params.id;
  const updated = await DegreeType.findByIdAndUpdate(id, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, message: "DegreeType Not Found" });
  }
  res.json({ success: true, message: "Successfully DegreeType Updated" });
};

const deleteDegreeType = async (req, res) => {
  const id = req.params.id;
  const Deleted = await DegreeType.findByIdAndDelete(id);
  if (!Deleted) {
    return res.status(404).json({ success: false, message: "DegreeType Not Found" });
  }
  res.json({ success: true, message: "Successfully Deleted" });
};

module.exports = {
  createDegreeType,
  getAllDegreeType,
  updateDegreeType,
  deleteDegreeType,
};
