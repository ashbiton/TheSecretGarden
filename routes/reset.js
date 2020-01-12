var express = require('express');
var router = express.Router();
const usersDB = require('../usersDB');

router.get('/:token',async function (req,res) {
    try{
        let token = req.params.token;
        if (!token){
            throw "Token is missing.";
        }
        let user = await usersDB.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
        if (!user){
            throw "Password reset token is invalid or has expired."
        }
        res.json({code: 200});
    }
    catch(err){
        res.json({code: 404, text: err});
    }
});

router.post('/', async function(req,res){
    let password = req.body.password;
    let token = req.body.token;
    try {
        if (!password || !token){
            throw "Password or token is missing";
        }
        let user = await usersDB.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
        if (!user){
            throw "Password reset token is invalid or has expired."
        }
        await usersDB.resetUserPassword(user,password);
        res.json({code: 200, text: "Password successfully updated"});
        
    }
    catch(err){
        res.json({code: 404, text: err.message || err});
    }
    
})

module.exports = router;