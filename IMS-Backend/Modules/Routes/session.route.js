const { getAllSession, createSession, updateSession, deleteSession } = require('Modules/Controllers/Academic/session.controller');
const express = require('express');
const router = express.Router();


router.get('/',getAllSession);

router.post('/',createSession);

router.put('/:id',updateSession);

router.delete('/:id',deleteSession)


module.exports = router