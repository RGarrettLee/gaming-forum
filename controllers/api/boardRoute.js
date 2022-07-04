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

module.exports = router;