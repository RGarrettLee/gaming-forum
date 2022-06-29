const express = require("express");
const router = express.Router();
const withAuth = require("../../utils/auth");
const { Comment, User } = require("../../models");


// get all comments on post page
router.get('/', async (req, res) => {
    try {
      const commentData = await Comment.findAll({
        include: [User],
      });
      const comments = commentData.map((post) => post.get({ plain: true }));
      res.render('all-posts', { posts });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
router.post('/', withAuth, async (req, res) => {
    const body = req.body;
    try {
      const newComment = await Comment.create({...body , userId: req.session.userId });
      res.json(newPost);
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
  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const [affectedRows] = Comment.destroy({
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
  module.exports = router;