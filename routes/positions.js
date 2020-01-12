var express = require('express');
var router = express.Router();
const usersDB = require('../usersDB');

router.get('/', async function(req, res, next) {
    let result = await usersDB.getAllPositions();
    res.json({ positions: result });
});

module.exports = router;
