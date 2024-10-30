const express = require('express');
const router = express.Router();

const professorController = require('../controllers/professors');
const {saveProfessor} = require('../middleware/validate');

router.get('/', professorController.getAll); 

router.get('/:id', professorController.getSingle);

router.post('/',saveProfessor, professorController.createUser);

router.put('/:id',saveProfessor, professorController.updateUser);

router.delete('/:id', professorController.deleteUser);

module.exports = router;