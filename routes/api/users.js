const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route     POST api/users
//@desc      Register User
//@access    Public

router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Lütfen geçerli bir e-mail girin.').isEmail(),
    check(
      'password',
      'Lürfen şifrenizi en az 6 karakter olacak şekilde girin'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        response: false,
        msg: 'Lütfen geçerli bir Email ve Şifre giriniz.'
      });
    }
    //See if the user exists
    const { name, email, password } = req.body;

    try {
      var customId = require('custom-id');
      let userNumber = customId({});
      console.log(userNumber);
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ response: false, msg: 'Bu mail zaten alınmış' });
      }
      user = await User.findOne({ userNumber });
      if (user) {
        let userNumber = customId({});
        /* return res.status(400).json({
          errors: [{ msg: 'Number is used by someone' }]
        });*/
      }

      user = new User({
        name,
        email,
        password,
        userNumber
      });
      await user.save();

      /* const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ response:true });
        }
      );*/
      res.json({ response: true, msg: 'Kayıt Başarılı' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
