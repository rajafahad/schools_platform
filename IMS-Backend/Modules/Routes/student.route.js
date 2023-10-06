const express = require("express");
const router = express.Router();
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../Controllers/Student/student.controller");

// Get all students
router.get("/", getAllStudents);

// Get a single student by ID
router.get("/:id", getStudentById);

// Create a new student
router.post("/", createStudent);

// Update an existing student
router.put("/:id", updateStudent);

// Delete a student
router.delete("/:id", deleteStudent);

module.exports = router;
