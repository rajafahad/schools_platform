const express = require('express');
const departmentController = require('../Controllers/Staff/staffDepartment.controller');
const router = express.Router();

// Route for retrieving all departments
router.get('/', departmentController.getAllDepartments);

// Route for creating a new department
router.post('/', departmentController.createDepartment);

// Route for retrieving a specific department
router.get('/:id', departmentController.getDepartmentById);

// Route for updating a specific department
router.patch('/:id', departmentController.updateDepartment);

// Route for deleting a specific department
router.delete('/:id', departmentController.deleteDepartment);

module.exports = router;
