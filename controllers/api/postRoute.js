const express = require("express");
const router = express.Router();
const withAuth = require("../../utils/auth");
const { Post, User } = require("../../models");

// get all posts on board page
router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [User],
      });
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render('all-posts', { posts });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  // get single post
  router.get('/post/:slug', async (req, res) => {
    try {
      const postData = await Board.findByPk(req.params.slug, {
        include: [
          User,
          {
            model: Post,
            include: [User],
          },
        ],
      });
      if (postData) {
        const post = postData.get({ plain: true });
        res.render('single-post', { post });
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post('/', withAuth, async (req, res) => {
    const body = req.body;
    try {
      const newPost = await Post.create({...body , userId: req.session.userId });
      res.json(newPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.put('/:slug', withAuth, async (req, res) => {
    try {
      const [affectedRows] = await Post.update(req.body, {
        where: {
          slug: req.params.slug,
        },
      });
      if (affectedRows > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.delete('/:slug', withAuth, async (req, res) => {
    try {
      const [affectedRows] = Post.destroy({
        where: {
          slug: req.params.slug,
        },
      });
      if (affectedRows > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  module.exports = router;