const sequelize = require ('../config/connection');
const { User, Post, Comment, Board } = require('../models');

const boardData = require('./boardData.json');
const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commendData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await Board.bulkCreate(boardData, {
        individualHooks: true,
        returning: true,
    });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await Post.bulkCreate(postData, {
        individualHooks: true,
        returning: true,
    });

    await Comment.bulkCreate(commentData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
}

seedDatabase();