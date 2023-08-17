const mongoose = require('mongoose');


const { Schema } = mongoose;
  
 const pulseSchema = new Schema({
  timer: Number
});
  
module.exports = mongoose.model('timer', pulseSchema); 