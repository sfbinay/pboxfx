const mongoose = require('mongoose');

const AnlayzeSchema = new mongoose.Schema({
  baslik: {
    type: String,
    required: true
  },
  icerik: {
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
module.exports = Analyze = mongoose.model('analyze', AnlayzeSchema);
