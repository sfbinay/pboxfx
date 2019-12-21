const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Announcement = require('../../models/Duyuru');
const auth = require('../../middleware/auth');
const moment = require('moment');

//@route     GET api/announcement
//@desc      Test Route
//@access    Public

router.get('/', auth, async (req, res) => {
  try {
    const profiles = await Announcement.find()
      .sort({ date: -1 })
      .select('-date');

    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route     POST api/announcement
//@desc      Create Post
//@access    Private
router.post(
  '/',
  [
    auth,
    [
      check('duyuru', 'Duyuru alanı boş olamaz')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    try {
      var dt = moment()
        .format('L')
        .replace('/', '.')
        .replace('/', '.')
        .replace('/', '.');

      const newDuyuru = {
        duyuru: req.body.duyuru,
        tarih: dt
      };

      const duyuru = new Announcement(newDuyuru);
      await duyuru.save();
      return res.json({ response: true, msg: 'Duyuru Gönderimi başarılı' });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error!');
    }
  }
);

module.exports = router;
