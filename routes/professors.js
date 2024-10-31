const express = require('express');
const router = express.Router();

const professorController = require('../controllers/professors');
const {saveProfessor} = require('../middleware/validate');

router.get('/', professorController.getAll); 

router.get('/:id', professorController.getSingle);

router.post('/',saveProfessor, professorController.createProfessor);

router.put('/:id',saveProfessor, professorController.updateProfessor);

router.delete('/:id', professorController.deleteProfessor);

module.exports = router;