const router = require('express').Router();
const homeRoutes = require('./homeRoute');
const commentRoutes = require('./commentRoute');
const genreRoutes = require('./genreRoute');
const postsRoutes = require('./postRoute');
const loginRoutes = require('./loginRoute');

router.use('/login', loginRoutes);
router.use('/comment', commentRoutes);
router.use('/posts', postsRoutes);
router.use('/home', homeRoutes);
router.use('/genre', genreRoutes);

module.exports = router;
