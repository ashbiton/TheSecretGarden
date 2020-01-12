var express = require('express');
var router = express.Router();
const usersDB = require('../usersDB');
const User = require('../model')('User');
var passport = require('passport');


waitASec = (func) => {
    setTimeout(func, 1000);
}

router.get('/' ,(async (req, res) => {
    await req.logout();
    console.log(req.user);
    res.json({code: 200 , text: "successfully logged out."})
}));

module.exports = router;
