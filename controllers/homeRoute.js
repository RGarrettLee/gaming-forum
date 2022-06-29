const router = require('express').Router();
const { User, Board } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const boardData = await Board.findAll({
      //attributes: { exclude: ['password'] },
      include: [User]
    });

    const boards = boardData.map((board) => board.get({ plain: true }));

    res.render('main', {
      boards,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;