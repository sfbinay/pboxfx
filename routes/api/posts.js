const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const CardInfos = require('../../models/CardInfos');
//@route     GET api/posts
//@desc      Test Route
//@access    Public

router.get('/', auth, async (req, res) => {
  try {
    const cards = await CardInfos.find()
      .select('-_id')
      .select('-user')
      .select('-date')
      .sort({ date: -1 });
    res.json(cards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
});

module.exports = router;
