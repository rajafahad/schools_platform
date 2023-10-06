const Subject = require("../../Models/subject.model");

const createSubject = async (req, res) => {
  const { name, branch, subjectCode, subjectType, status } = req.body;
  for (const branchId of branch) {
    const newSubject = new Subject({
      ...req.body,
      branch: branchId,
     
    });
    await newSubject.save();
  }
  res.status(201).json({ success: true, message: "Successfully Created" });
};

const getSubjects = async (req, res) => {
  const subjects = await Subject.find().populate({
    path: "branch",
    select: "branchName -_id",
  }).sort({ createdAt: 'desc'}).exec();
  res.send(subjects);
};

const getSubjectById = async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  if (!subject) {
    return res
      .status(404)
      .json({ success: false, message: "Subject not found" });
  }
  res.status(200).json({ success: true, data: subject });
};

const updateSubject = async (req, res) => {
  const subject = await Subject.findByIdAndUpdate(req.params.id, req.body);
  if (!subject) {
    return res
      .status(404)
      .json({ success: false, message: "Subject not found" });
  }
  res.json({ success: true, message: "Successfully Subject Updated" });
};

const deleteSubject = async (req, res) => {
  const subject = await Subject.findByIdAndDelete(req.params.id);
  if (!subject) {
    return res
      .status(404)
      .json({ success: false, message: "Subject not found" });
  }
  res.json({ success: true, message: "Subject Deleted" });
};



const getSubjectByBranch = async(req,res)=>{
  const branch = req.params.branch;
  const subjects = await Subject.find({branch,status:1})
  res.send(subjects)
  }

module.exports = {
  createSubject,
  getSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
  getSubjectByBranch,
};
