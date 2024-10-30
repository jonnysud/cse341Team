const router = require('express').Router();




router.use('/users', require('./users'));
router.use('/tasks', require('./tasks'));
router.use('/courses', require('./courses'));
router.use('/professors', require('./professors'));



module.exports = router;