const express = require("express");
const router = express.Router();
const withAuth = require("../../utils/auth");
const { Board, User, Post } = require("../../models");

router.get('/', async (req, res) => {
    try {
        const boardData = await Board.findAll({
            include: [User],
        });

        const board = boardData.map((board) => board.get({ plain: true }));

        res.status(200).json(board); // change to render onto board data
    } catch (err) {
        res.status(500).json({ "message": err });
    }
});

router.get('/test', async(req, res) => {
    try {
        const boardData = await Board.findAll({
            where: {
                user_id: req.session.user_id
            }
        });

        if (!boardData) {
            res.status(404).json({ 'message': 'no boards made by that user' });
        } else {
            const board = boardData.map((board) => board.get({ plain: true }));

            res.status(200).json(board); // change to render onto board data
        }
    } catch (err) {
        res.status(500).json({ 'message': err });
    }
});

router.get('/:slug', async (req, res) => {
    try {
        const board = await Board.findOne({
            where: {
                slug: req.params.slug
            },
            include: [Post],
        });
    
        res.status(200).json(board)
    } catch (err) {
        res.status(500).json({ "message": err });
    }
});

router.post('/new', (req, res) => {
    try { 

    } catch (err) {
        res.status(500).json({ 'message' : err });
    }
})

module.exports = router;