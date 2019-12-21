const mongoose = require('mongoose');

const DuyuruSchema = new mongoose.Schema({
  duyuru: {
    type: String,
    required: true
  },
  tarih: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Duyuru = mongoose.model('duyuru', DuyuruSchema);
