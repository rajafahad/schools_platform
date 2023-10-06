const express = require('express');
const router = express.Router();
const { 
  getGuardians, 
  getGuardianById, 
  createGuardian, 
  updateGuardian, 
  deleteGuardian, 
} = require('../Controllers/Guardian/guardian.controller');


router.get('/', getGuardians);
router.get('/:id', getGuardianById);
router.post('/', createGuardian);
router.patch('/:id', updateGuardian);
router.delete('/:id', deleteGuardian);


module.exports = router;
