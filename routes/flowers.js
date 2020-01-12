var express = require('express');
var router = express.Router();
const flowersDB = require('../flowersDB');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let result = await flowersDB.getFlowersList();
  res.json({flowers : result});
});

module.exports = router;
