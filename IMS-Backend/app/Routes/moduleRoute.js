const express = require('express');
const { getAllModule, getModuleById, updateModule, addModule, deleteModule } = require('../controllers/moduleController');
const router = express.Router();


router.get('/',getAllModule);

router.get('/:id',getModuleById);

router.put('/:id',updateModule);

router.post('/',addModule);

router.delete('/:id',deleteModule);


module.exports = router;