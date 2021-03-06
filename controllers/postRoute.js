const express = require("express");
const router = express.Router();
const withAuth = require("../utils/auth");
const { Post, User, Comment } = require("../models");

// get all posts on board page
router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [
            User,
            {
                model: Post,
                include: [User]
            }
        ],
      });
      const posts = postData.map((post) => post.get({ plain: true }));
      res.json('post', { posts, loggedIn: req.session.logged_in });
    } catch (err) {
      res.status(500).json(err);
    }
});

// get single post
router.get('/:slug', async (req, res) => {
    try {
        const postData = await Post.findOne({
        where: {
            slug: req.params.slug
        },
            include: [User, Comment, { model: Comment, include: [User] }]
        });
        if (postData) {
            const post = postData.get({ plain: true });
            post.comments.forEach((comment) => comment['sess_id'] = req.session.user_id);
            res.status(200).render('post', { post, loggedIn: req.session.logged_in, user_id: req.session.user_id });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;