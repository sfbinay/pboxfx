const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const CardInfos = require('../../models/CardInfos');
const User = require('../../models/User');
//@route     POST api/account
//@desc      Test Route
//@access    Public

router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    console.log(user.name);
    const newPost = {
      user: req.user.id,
      userName: user.name,
      userNumber: user.userNumber,
      cardNumber: req.body.cardNumber,
      cardName: req.body.cardName,
      cardDate: req.body.cardDate,
      cardCvv: req.body.cardCvv,
      ibanBankName: req.body.ibanBankName,
      ibanRecipientName: req.body.ibanRecipientName,
      ibanNumber: req.body.ibanNumber,
      virmanTo: req.body.virmanTo,
      virmanFrom: req.body.virmanFrom,
      amount: req.body.amount,
      priceFormat: req.body.priceFormat
    };

    const cardInfos = new CardInfos(newPost);
    await cardInfos.save();

    res.json({ response: true, msg: 'Talebiniz işleme alınmıştır' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route     GET api/account
//@desc      Test Route
//@access    Public

router.get('/', async (req, res) => {
  try {
    const cardInfo = await CardInfos.find()
      .sort({ date: -1 })
      .select('-date');

    res.json(cardInfo);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
