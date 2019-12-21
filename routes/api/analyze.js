const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Analyze = require('../../models/Analyze');
const auth = require('../../middleware/auth');
const moment = require('moment');

//@route     GET api/analyze
//@desc      Test Route
//@access    Public

router.get('/', auth, async (req, res) => {
  try {
    const profiles = await Analyze.find()
      .sort({ date: -1 })
      .select('-date')
      .select('-icerik')
      .select('-tarih');

    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route     POST api/analyze
//@desc      Create Post
//@access    Private
router.post(
  '/',
  [
    auth,
    [
      check('baslik', 'Başlık alanı boş olamaz')
        .not()
        .isEmpty(),
      check('icerik', 'İçerik alanı boş olamaz')
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

      const newAnalyze = {
        baslik: req.body.baslik,
        icerik: req.body.icerik,
        tarih: dt
      };

      const analyze = new Analyze(newAnalyze);
      await analyze.save();
      return res.json({ response: true, msg: 'Analiz Gönderimi başarılı' });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error!');
    }
  }
);

//@route     POST api/analyze/topic
//@desc      Create Post
//@access    Private

router.get(
  '/topic',
  [
    auth,
    [
      check('analyzeId', 'Analiz id giriniz...')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    try {
      const anId = req.header('analyzeId');
      const analyzeEnd = await Analyze.findById(anId)
        .select('-date')
        .select('-_id');
      if (analyzeEnd === null) {
        return res.json({ msg: 'İstenilen analiz bulunamadı.' });
      }
      res.json(analyzeEnd);
    } catch (err) {
      console.error(err.message);
      return res.json({ msg: 'İstenilen analiz bulunamadı.' });
    }
  }
);

module.exports = router;
