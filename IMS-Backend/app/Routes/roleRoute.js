const express = require('express');
const { getAllRoles, getRoleById, addRole, updateRole, deleteRole } = require('../controllers/roleController');
const router = express.Router()

router.get('/',getAllRoles);

router.get('/:id',getRoleById);

router.post('/',addRole);

router.put('/:id',updateRole);

router.delete('/:id',deleteRole);


module.exports = router;