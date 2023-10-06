const Level = require("Modules/Models/level.model");

const createLevel = async (req, res) => {
  const { name, branch, status } = req.body;

  for (const branchId of branch) {
    const newLevel = Level({
      name,
      status,
      branch: branchId,
    });
    await newLevel.save();
  }
  res
    .status(201)
    .json({ success: true, message: "Level Successfully Created" });
};

const getAllLevel = async (req, res) => {
  const levels = await Level.find().populate({
    path: "branch",
    select: "branchName -_id",
  });
  res.send(levels);
};

const updateLevel = async (req, res) => {
  const id = req.params.id;
  const level = await Level.findByIdAndUpdate(id, req.body);
  if (!level) {
    return res.status(404).json({ success: false, message: "Level Not Found" });
  }
  res.json({ success: true, message: "Successfully Level Updated" });
};

const deleteLevel = async (req, res) => {
  const id = req.params.id;
  const level = await Level.findByIdAndDelete(id);
  if (!level) {
    return res.status(404).json({ success: false, message: "Level Not Found" });
  }
  res.json({ success: true, message: "Successfully Deleted" });
};

module.exports = {
  createLevel,
  getAllLevel,
  updateLevel,
  deleteLevel,
};
