const express = require('express');
const router = express.Router();

const courseController = require('../controllers/courses');
const {saveCourse} = require('../middleware/validate');

router.get('/', courseController.getAll); 

router.get('/:id', courseController.getSingle);

router.post('/',saveCourse, courseController.createUser);

router.put('/:id',saveCourse, courseController.updateUser);

router.delete('/:id', courseController.deleteUser);

module.exports = router;