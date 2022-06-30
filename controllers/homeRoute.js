const router = require('express').Router();
const { User, Board } = require('../models');
const withAuth = require('../utils/auth');

//get all boards for homepage
router.get('/', async (req, res) => {
  try {
    const boardData = await Board.findAll({
      attributes: { exclude: ['password'] },
      include: [User]
    });

    const boards = boardData.map((board) => board.get({ plain: true }));

    res.render('layouts/main', {
      boards,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single board
router.get('/board/:slug', async (req, res) => {
  try {
    const boardData = await Board.findByPk(req.params.slug, {
      include: [
        User,
        {
          model: board,
          include: [User],
        },
      ],
    });
    if (boardData) {
      const board = boardData.get({ plain: true });
      res.render('board', { post });
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