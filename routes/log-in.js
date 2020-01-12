var express = require('express');
var router = express.Router();
const usersDB = require('../usersDB');
const User = require('../model')('User');
var passport = require('passport');


waitASec = (func) => {
    setTimeout(func, 1000);
}

router.post('/', passport.authenticate('local') ,(async (req, res) => {
    res.json({ code: 200, text: "OK" });  
    // let username = req.body.username;
    // let password = req.body.password;
    // let user = User.REQUEST({ username: username, password: password });
    // if (user)
    //     res.json({ code: 200, text: "OK" });
    // else
    //     res.json({ code: 404, text: "User Not Found" });

    // let username = req.body.username;
    // let password = req.body.password;
    // let isThereUser = await usersDB.isThereUser(username, password);
    // if (isThereUser)
    //     res.json({ code: 200, text: "OK" });
    // else
        // res.json({ code: 200, text: "OK" });

    // res.json({ code: 404, text: "User Not Found" });

    // if (usersDB.isThereUser(username, password)) {
    //     res.json({ code: 200, text: "OK" });
    // } else {
    // res.json({ code: 404, text: "User Not Found" });
    // }
}));

module.exports = router;
