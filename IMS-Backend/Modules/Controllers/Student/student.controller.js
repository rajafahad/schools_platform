const Student = require("../../Models/student.model");

//........................................................./
//@ Method: GET -------------------------------------------/
//........................................................./
/**
 *$ Type: Controller
 ** Endpoint: student/getstudent
 ** Description:Get All Data
 */
//........................................................./
const getAllStudents = async (req, res) => {
  const { branchId } = req.user;
  const students = await Student.find({branchId});
  res.json(students);
};




//........................................................./
//@ Method: GET/:id */
//........................................................./
/**
 *$ Type: Controller
 * @param /:id
 ** Endpoint: student/getstudentbyid/:id
 ** Description:Get Data By id
 */
//........................................................./
const getStudentById = async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.json(student);
};





//........................................................./
//@ Method: POST */
//........................................................./
/**
 *$ Type: Controller
 ** Endpoint: student/createstudent
 ** Description: Create New Record
 */
//........................................................./
const createStudent = async (req, res) => {
  const student = new Student(req.body);
  const newStudent = await student.save();
  res.status(201).send(newStudent);
};





//........................................................./
//@ Method: UPDATE/:id */
//........................................................./
/**
 *$ Type: Controller
 * @param /:id
 ** Endpoint: student/updatestudent/:id
 ** Description: Update the Existing Record By id
 */
//........................................................./
const updateStudent = async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.json(student);
};





//........................................................./
//@ Method: POST */
//........................................................./
/**
 *$ Type: Controller
 * @param /:id
 ** Endpoint: student/deletestudent/:id
 ** Description: Delete the Existing Record By id
 */
//........................................................./
const deleteStudent = async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.json({ message: "Student deleted" });
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
