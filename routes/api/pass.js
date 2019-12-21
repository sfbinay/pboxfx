const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

router.post(
  '/',
  [
    check(
      'password',
      'Lürfen şifrenizi en az 6 karakter olacak şekilde girin'
    ).isLength({ min: 6 })
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        response: false,
        msg: 'Şifreniz en az 6 karakterden oluşmalıdır.'
      });
    }

    try {
      const profile = await User.findOne({ _id: req.user.id });
      console.log(profile);

      console.log(req.body);
      var obj = JSON.parse(JSON.stringify(req.body));

      const changePassword = {};
      changePassword.email = profile.email;
      changePassword.name = profile.name;
      changePassword.password = obj.password;
      console.log(obj);
      if (req.body.oldPassword !== profile.password) {
        return res.json({
          respons: false,
          msg: 'Lütfen şifrenizi doğru girin.'
        });
      } else {
        console.log('bir Yerdeyim');
        const prof = await User.findOneAndUpdate(
          { email: changePassword.email },
          { $set: changePassword },
          { new: true }
        );

        return res.json({
          respons: true,
          msg: 'Şifre Değiştirme işlemi başarılı.'
        });
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }

    res.send('Posts Route');
  }
);

router.post(
  '/forgot',
  [check('email', 'Lütfen geçerli bir email giriniz.').isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        response: false,
        msg: 'Lütfen geçerli bir E-mail giriniz.'
      });
    }

    try {
      const profile = await User.findOne({ email: req.body.email });

      const email = profile.email;
      if (!profile) {
        return res.json({
          response: 'false',
          msg: 'Girmiş olduğunuz E-mail tanımlı değildir.'
        });
      }
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'yesilyurtt.gurkan@gmail.com',
          pass: '12345678gh'
        }
      });
      const mailOptions = {
        from: 'yesily23urtt@gmail.com',
        to: email,
        subject: 'Şifre Değişikliği',
        text: 'Şifre',
        html: '<p><b>Şifre</b> Değişikliği</p>'
      };

      transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
          console.log(err);
          return res.json({
            response: false,
            msg: 'Lütfen tekrar deneyin...'
          });
        } else
          return res.json({
            response: true,
            msg: 'Lütfen mail adresinizi kontrol edin...'
          });
      });
      /*nodemailer.createTestAccount((err, account) => {
        if (err) {
          return res.json({
            response: 'false',
            msg: 'Lütfen mail adresinizi kontrol edin...'
          });
        }

        console.log('Credentials obtained, sending message...');

        // Create a SMTP transporter object
        let transporter = nodemailer.createTransport({
          host: 'smtp.googlemail.com',
          port: 465,
          secure: true, // this is true as port is 465
          auth: {
            user: 'yesilyurtt.gurkan@gmail.com',
            pass: '12345678gh'
          }
        });

        // Message object
        let message = {
          from: 'yesilyurtt.gurkan@gmail.com',
          to: email,
          subject: 'Şifre Değişikliği',
          text: 'Şifre',
          html: '<p><b>Şifre</b> Değişikliği</p>'
        };

        transporter.sendMail(message, (err, info) => {
          if (err) {
            return res.json({
              response: 'false',
              msg: 'Lütfen mail adresinizi kontrol edin...'
            });
          }
          console.log('Message sent: %s', info.messageId);
        });
      });*/
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
    res.json({
      response: true,
      msg: 'Şifre sıfırlama isteği alındı.Lütfen mail adresinizi kontrol edin'
    });
  }
);

module.exports = router;
