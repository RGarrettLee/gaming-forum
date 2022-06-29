const express = require("express");
const router = express.Router();
const withAuth = require("../../utils/auth");
const { Post, User } = require("../../models");

router.get('/', async (req, res) => {
    const genreData = await Post.findAll({
        attributes: ['genre']
    });

    const genres = genreData.map((genre) => genre.get({ plain: true }));

    res.json(genres);
});

router.get('/:genre', async (req, res) => {
    const postData = await Post.findAll({
        where: {
            genre: req.params.genre
        }
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.json(posts);
});

module.exports = router;