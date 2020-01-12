var express = require('express');
var router = express.Router();
const branchesDB = require('../branchesDB');
// const branchesDB = require('../model')("Branch");

router.post('/', async (req, res) => {
    let result = await branchesDB.getBranchesList();
    res.render('branches', { branches: result });
});

router.get('/', async (req, res) => {
    let result = await branchesDB.getBranchesNumbers();
    res.json({ branches: result });
})

module.exports = router;
