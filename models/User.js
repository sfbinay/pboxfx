const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  userNumber: {
    type: String,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model('user', UserSchema);
