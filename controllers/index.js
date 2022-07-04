const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoute');
const postRoutes = require('./postRoute');
const genreRoutes = require('./genreRoute');

router.use('/', homeRoutes);
router.use('/post', postRoutes);
router.use('/api', apiRoutes);
router.use('/genres', genreRoutes);

module.exports = router;
