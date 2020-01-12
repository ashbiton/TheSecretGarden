var express = require('express');
var router = express.Router();
const usersDB = require('../usersDB');

router.get('/', (req, res) => {
    res.render('navbar', {});
})
router.post('/', async (req, res) => {
    let view = "generalLinks";
    let position = await usersDB.getUserPosition(req.body.username); 
    switch (position) {
        case "worker":
            view = "workerLinks";
            break;
        case "manager":
            view = "managerLinks";
            break;
        default:
            break;
    }
    res.render("links/" + view, {});
});

module.exports = router;