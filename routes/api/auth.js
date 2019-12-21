const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

//@route     GET api/auth
//@desc      Test Route
//@access    Public

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
});

//@route     POST api/auth
//@desc      Login User and get Token
//@access    Public

router.post(
  '/',
  [
    check('email', 'Lütfen doğru bir email giriniz.').isEmail(),
    check('password', 'Lütfen şifrenizi giriniz').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log('girdi1');
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({
          response: false,
          msg: 'Lütfen geçerli bir Email ve Şifre giriniz.'
        });
    }
    //See if the user exists
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ response: false, msg: 'Kullanıcı bulunamadı.' });
      }

      if (password !== user.password) {
        return res.status(400).json({ response: false, msg: 'Şifre hatalı.' });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ response: true, token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
