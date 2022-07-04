const express = require("express");
const router = express.Router();
const { Post, User } = require("../models");

router.get('/', async (req, res) => {
    const postData = await Post.findAll();
    const posts = postData.map((post) => post.get({ plain: true }));
    const filtered = posts.filter((v, i, a) => a.findIndex(v2 => ( v2.genre === v.genre)) === i);
    res.status(200).render('postByGenre', { 'posts': filtered, loggedIn: req.session.logged_in });
});

router.get('/:genre', async (req, res) => {
    const postData = await Post.findAll({ where: { genre: req.params.genre },include:[User]});
    const posts = postData.map((post) => post.get({ plain: true }));
    res.status(200).render('genre', { posts, loggedIn: req.session.logged_in }); // replace handlebar with appropriate handlebar
});

module.exports = router;