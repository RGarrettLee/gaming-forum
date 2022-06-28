const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Board = require('./Board');

Board.hasMany(Post, {
    foreignKey: 'board_id',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Post.belongsTo(Board, {
    foreignKey: 'board_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

module.exports = { User, Board, Post, Comment };