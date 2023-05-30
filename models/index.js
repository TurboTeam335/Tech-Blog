const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});//

// User.hasMany(Post, {
//   foreignKey: 'user_id'
// })

Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

// Comment.belongsTo(Post, {
//   foreignKey: 'post_id'
// })

Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});//

// User.hasMany(Comment, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// })//


module.exports = {
  User,
  Comment,
  Post
};