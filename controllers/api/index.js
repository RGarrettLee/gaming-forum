const router = require('express').Router();
const boardRoutes = require('./boardRoute');
const commentRoutes = require('./commentRoute');
const postsRoutes = require('./postRoute');
const userRoutes = require ('./userRoute');

router.use('/comment', commentRoutes);
router.use('/posts', postsRoutes);
router.use('/home', boardRoutes);
router.use('/user', userRoutes);

module.exports = router;
