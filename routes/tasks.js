const express = require('express');
const router = express.Router();

const taskController = require('../controllers/tasks');

router.get('/', taskController.getAll); 

router.get('/:id', taskController.getSingle);

router.post('/', taskController.createTask);

router.put('/:id', taskController.updateTask);

router.delete('/:id',taskController.deleteTask);

module.exports = router;