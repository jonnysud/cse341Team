const express = require('express');
const router = express.Router();

const taskController = require('../controllers/tasks');
const {saveTask} = require('../middleware/validate');

router.get('/', taskController.getAll); 

router.get('/:id', taskController.getSingle);

router.post('/',saveTask, taskController.createTask);

router.put('/:id',saveTask, taskController.updateTask);

router.delete('/:id',taskController.deleteTask);

module.exports = router;