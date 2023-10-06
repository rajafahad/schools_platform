const { getAllDepartment, createDepartment, updateDepartment, deleteDepartment } = require('Modules/Controllers/Academic/department.controller');
const express = require('express')
const router = express.Router();


router.get('/',getAllDepartment);

router.post('/',createDepartment);

router.put('/:id',updateDepartment);

router.delete('/:id',deleteDepartment);


module.exports = router