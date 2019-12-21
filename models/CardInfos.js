const mongoose = require('mongoose');
const CardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  userName: {
    type: String
  },
  userNumber: {
    type: String
  },
  priceFormat: {
    type: String
  },
  cardNumber: {
    type: String
  },
  cardName: {
    type: String
  },
  cardDate: {
    type: String
  },
  cardCvv: {
    type: String
  },
  ibanBankName: {
    type: String
  },
  ibanRecipientName: {
    type: String
  },
  ibanNumber: {
    type: String
  },
  virmanFrom: {
    type: String
  },
  virmanTo: {
    type: String
  },
  amount: {
    type: String
  },
  status: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = CardInfos = mongoose.model('card', CardSchema);
