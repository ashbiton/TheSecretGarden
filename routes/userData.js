var express = require('express');
var router = express.Router();
const usersDB = require('../usersDB');

router.get('/', async function (req, res) {
    console.log("in userData get");
    if (!req.user) {
        res.status(404).send("User not found");
    }
    else {
        let user = {};
        let headers = usersDB.getHeadersForPosition(req.user.position, false);
        if (headers.position) // we don't want the user to be able to edit his position
            delete headers.position;
        headers.forEach(header => {
            user[header] = req.user[header];
        });
        let modal = req.user.position == "manager" ? "#workerModal" : "#" + req.user.position + "Modal";
        res.status(200).render('partials/userSettings', { user: user, headers: headers, modal: modal });
    }
});
router.post('/', async function (req, res) {
    console.log("in userData post");
    if (!req.user) {
        res.status(404).send("User not found");
    }
    else {
        let user;
        let headers = usersDB.getHeadersForPosition(req.user.position, false);
        headers.forEach(header => {
            user[header] = req.user[header];
        });
        let modal = position == "manager" ? "#workerModal" : "#" + user.position + "Modal";
        res.status(200).render('partials/userSettings', { user: user, headers: headers, modal: modal });
    }
});
module.exports = router;