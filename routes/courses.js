const express = require('express');
const router = express.Router();

const courseController = require('../controllers/courses');
const {saveCourse} = require('../middleware/validate');

router.get('/', courseController.getAll); 

router.get('/:id', courseController.getSingle);

router.post('/',saveCourse, courseController.createCourse);

router.put('/:id',saveCourse, courseController.updateCourse);

router.delete('/:id', courseController.deleteCourse);

module.exports = router;