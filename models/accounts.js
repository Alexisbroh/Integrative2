const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Mixed = mongoose.Schema.Types.Mixed;

const { Schema } = mongoose;

const accountsSchema = new Schema({
  name: String,
  email: String,
  password: String,
  last_name: String,
  vibes_id: Number
});

accountsSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

accountsSchema.methods.comparePassword= function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('account', accountsSchema); 