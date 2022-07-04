const express = require("express");
const router = express.Router();
const withAuth = require("../../utils/auth");
const { User, Board, Post } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    if (name) {
      const newBoard = await Board.create({ name: name, user_id: req.session.user_id });
      res.status(201).json(newBoard);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:slug', async (req, res) => { // delete
  try {
    const boardData = await Board.findOne({ where: { slug: req.params.slug }});
    const board = boardData.get({ plain: true });

    if (board.user_id == req.session.user_id) {
      const deletedBoard = await Board.destroy({ where: { slug: req.params.slug }});
      res.status(204).json(deletedBoard);
    } else {
      res.status(403).json({ 'message': 'user not authorized' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
})
module.exports = router;