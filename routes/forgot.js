var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const usersDB = require('../usersDB');
const nodemailer = require('nodemailer');
const debug = require("debug")("routes:forgot");

handleError = (err, res) => {
  res.json({ code: 404, text: err });
}
router.post('/', async function (req, res, next) {
  try {
    let token = await new Promise((resolve, reject) => {
      crypto.randomBytes(20, function (err, buf) {
        if (err) reject(err);
        var token = buf.toString('hex');
        resolve(token);
      });
    }).catch(err => { handleError(err, res) })
    console.log(token);
    let user = await usersDB.findOne({ email: req.body.email }).catch((err) => { handleError(err, res) })
    if (!user) { throw "No account with that email address exists" };
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await new Promise((_resolve, reject) => {
      user.save(function (err) {
        reject(err);
      })
    }).catch(err => { handleError(err, res) });
    var smtpTransport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        // type: 'OAuth2',
        user: 'aviyasholy2@gmail.com',
        pass: '313416067'
      }
    });
    var mailOptions = {
      to: user.email,
      from: 'aviyasholy2@gmail.com',
      subject: 'The Secret Garden - Password Reset',
      text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://' + req.headers.host + '#reset?token=' + token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    };
    smtpTransport.sendMail(mailOptions, function (err,info) {
      if (err) throw err;
      res.json({ code: 200, text: 'An e-mail has been sent to ' + user.email + ' with further instructions.' });
    });
  }
  catch (err) {
    res.json({ code: 404, text: err.message || err });
  }
});

module.exports = router;