var express = require('express');
var router = express.Router();
const flowersDB = require('../flowersDB');
const userDB = require('../usersDB');


router.post('/', async function (req, res, next) {
    let position = await userDB.getUserPosition(req.body.username);
    let flowers = await flowersDB.getFlowersList();
    let canAdd = false;
    if (position == "supplier") canAdd = true;
    res.render('catalog', { flowers: flowers, canAdd: canAdd });
});

module.exports = router;
