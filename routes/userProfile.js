var express = require('express');
var router = express.Router();
const userDB = require('../usersDB');

router.get('/', async function(req, res, next) {
    res.render('userProfile',{user: req.user});
});

router.post('/', async function(req, res, next) {
    let user = req.body;
    console.log("user",user);
    try{
        await userDB.updateCurrUser(req.user.username,user);
        res.json({code: 200 , text: "successfully updated profile"})

    }catch(err){
        res.json({code: 404 , text: "something went wrong!"})

    }
});

module.exports = router;