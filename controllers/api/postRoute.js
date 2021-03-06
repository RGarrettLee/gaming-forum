const express = require("express");
const router = express.Router();
const withAuth = require("../../utils/auth");
const { Post, User, Board } = require("../../models");

router.post('/', withAuth, async (req, res) => {
    const { title, genre, content, board_slug } = req.body;
    
    try {
      const slug = board_slug.replace('/board/', '');

      const boardData = await Board.findOne({ where: { slug: slug }});

      const board = boardData.get({ plain: true });

      const newPost = await Post.create({title: title, genre: genre, content: content, user_id: req.session.user_id, board_id: board.id });
      res.status(201).json(newPost);
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

router.delete('/:slug', async (req, res) => {
  try {
    const postData = await Post.findOne({ where: {slug: req.params.slug }});
    const post = postData.get({ plain: true });

    if (post.user_id == req.session.user_id) {
      const deletedPost = await Post.destroy({ where: { slug: req.params.slug }});
      res.status(204).json(deletedPost);
    } else {
      res.status(403).json({ 'message': 'user not authorized' });
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router;