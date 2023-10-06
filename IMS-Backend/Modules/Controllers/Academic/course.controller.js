const Course = require("Modules/Models/course.model");

const createCourse = async (req, res) => {
  const { branch } = req.body;
  for (const branchId of branch) {
    const newCourse = new Course({
      ...req.body,
      branch: branchId,
    });
    await newCourse.save();
  }
  res.status(201).json({ success: true, message: "Successfully Created" });
};

const getCourses = async (req, res) => {
  const courses = await Course.find()
    .populate({
      path: "branch",
      select: "branchName -_id",
    })
    .sort({ createdAt: "desc" })
    .exec();
  res.send(courses);
};

const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return res
      .status(404)
      .json({ success: false, message: "Course not found" });
  }
  res.status(200).json({ success: true, data: course });
};

const updateCourse = async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body);
  if (!course) {
    return res
      .status(404)
      .json({ success: false, message: "Course not found" });
  }
  res.json({ success: true, message: "Successfully Course Updated" });
};

const deleteCourse = async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) {
    return res
      .status(404)
      .json({ success: false, message: "Course not found" });
  }
  res.json({ success: true, message: "Course Deleted" });
};

const getCourseByBranch = async (req, res) => {
  const branch = req.params.branch;
  const courses = await Course.find({ branch, status: 1 });
  res.send(courses);
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCourseByBranch,
};
