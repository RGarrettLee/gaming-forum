const express = require("express");
const router = express.Router();
const withAuth = require("../utils/auth");
const { Post, User, Comment } = require("../models");

router.get('/', async (req, res) => {
    const postData = await Post.findAll();
    const posts = postData.map((post) => post.get({ plain: true }));
    const genres = posts.map((post) => post.genre);
    // go through genres array to filter out duplicate genres
    console.info(genres);
    res.status(200).render('postByGenre', { posts });
});

router.get('/:genre', async (req, res) => {
    const postData = await Post.findAll({ where: { genre: req.params.genre }});
    const posts = postData.map((post) => post.get({ plain: true }));
    res.status(200).render('handlebar', { posts }); // replace handlebar with appropriate handlebar
});

module.exports = router;