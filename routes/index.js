const router = require('express').Router();




router.use('/users', require('./users'));
router.use('/tasks', require('./tasks'));
router.use('/tags', require('./tags'));
router.use('/tasksTags', require('./tasks'));



module.exports = router;