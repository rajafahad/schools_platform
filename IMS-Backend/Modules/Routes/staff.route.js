const express = require('express');
const { getAllStaff, getStaffById, createStaff, updateStaff, deleteStaff } = require('../Controllers/Staff/staff.controller');
const router = express.Router();


router.get('/',getAllStaff);

router.get('/:id',getStaffById);

router.post('/',createStaff);

router.patch('/:id',updateStaff);

router.delete('/:id',deleteStaff)

module.exports = router;