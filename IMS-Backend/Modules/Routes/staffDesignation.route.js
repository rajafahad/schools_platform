const express = require('express');
const router = express.Router();
const staffDesignationController = require('../Controllers/Staff/staffDesignation.controller');


// Create a new staff designation
router.post('/', staffDesignationController.createStaffDesignation);

// Get all staff designations
router.get('/', staffDesignationController.getAllStaffDesignations);

// Get a single staff designation by ID
router.get('/:id', staffDesignationController.getStaffDesignationById);

// Update a staff designation by ID
router.patch('/:id', staffDesignationController.updateStaffDesignation);

// Delete a staff designation by ID
router.delete('/:id', staffDesignationController.deleteStaffDesignation);

module.exports = router;
