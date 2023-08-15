const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Mixed = mongoose.Schema.Types.Mixed;

const { Schema } = mongoose;

const postsSchema = new Schema({
  name_user: String,
  date: String,
  title: String,
  post: String
});


module.exports = mongoose.model('myPosts', postsSchema); 