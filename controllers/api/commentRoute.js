const express = require("express");
const router = express.Router();
const withAuth = require("../../utils/auth");
const { Comment, User, Post } = require("../../models");


// get all comments on post page
router.get('/', async (req, res) => {
    try {
      const commentData = await Comment.findAll({
        attributes: { exclude: ['password'] },
        include: [User],
      });
      const comments = commentData.map((post) => post.get({ plain: true }));
      res.render('post', { comments });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    const { content, post_slug } = req.body;
    try {
      const slug = post_slug.replace('/post/', '');

      const postData = await Post.findOne({
        where: {
          slug: slug
        }
      });

      const post = postData.get({ plain: true });

      const newComment = await Comment.create({content: content , user_id: req.session.user_id, post_id: post.id });
      res.status(201).json(newComment);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.put('/:id', withAuth, async (req, res) => {
    try {
      const [affectedRows] = await Comment.update(req.body, {
        where: {
          id: req.params.id,
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

router.delete('/', withAuth, async (req, res) => {
  try {
    const { content } = req.body;
    const commentData = await Comment.findOne({ where: { content: content }});
    const comment = commentData.get({ plain: true });

    const deletedComment = await Comment.destroy({ where: { id: comment.id }});
    res.status(204).json(deletedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;