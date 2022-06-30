const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoute');
const postRoutes = require('./postRoute');

router.use('/', homeRoutes);
router.use('/post', postRoutes);
router.use('/api', apiRoutes);

module.exports = router;
