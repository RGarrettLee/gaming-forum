const router = require('express').Router();
const { User, Board, Post } = require('../models');
const withAuth = require('../utils/auth');

//get all boards for homepage
router.get('/', async (req, res) => {
  try {
    const boardData = await Board.findAll({
      attributes: { exclude: ['password'] },
      include: [User]
    });

    const boards = boardData.map((board) => board.get({ plain: true }));

    res.render('homescreen', {
      boards,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single board
router.get('/board/:slug', async (req, res) => {
  try {
    const boardData = await Board.findOne({
      where: {
        slug: req.params.slug
      },
      include: [User, Post,
      {
        model: Post,
        include: [User]
      }],
    });
    if (boardData) {
      const board = boardData.get({ plain: true });
      res.render('board', { board, user_id: req.session.user_id });
    } else {
      res.status(404).end();
    }
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


router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

module.exports = router;