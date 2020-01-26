var express = require('express');
var router = express.Router();
const usersDB = require('../usersDB');

waitASec = (func) => {
    setTimeout(func, 1000);
}
let getInfoByHeaders = (user) => {
    // let customerHeaders = ["name","surname","email","phone", "username"];
    // let workerHeaders = [...customerHeaders, "payment","branch","position"];
    // let supplierHeaders = [...customerHeaders , "flowers"];
    let result_user = {};
    let headers = usersDB.getHeadersForPosition(user.position,false);
    headers.forEach(header => {
        result_user[header] = user[header];
    });
    return result_user;
}

router.get('/',async (req,res)=> {
    let user = undefined;
    if (req.user){
        user = getInfoByHeaders(req.user);
    }
    res.json({user: user});
})

router.delete('/', async (req, res) => {
    const usernameDelete = req.body.username;
    if (await usersDB.deleteUser(usernameDelete))
        waitASec(() => res.json({ code: 200, text: "Successfully Deleted User" }))
    // setTimeout(()=>{res.json({code : 200 , text: "Successfully Deleted User"})},7000);
    else
        waitASec(() => res.json({ code: 404, text: "Unable to delete the user" }))
    // setTimeout(()=>{res.json({code: 404 , text: "Unable to delete the user"})},7000);

})

router.post('/', async (req, res) => {
    const userToAdd = req.body;
    const shouldRegister = userToAdd.register;
    delete userToAdd.register;
    let [response,user] = await usersDB.addUser(userToAdd);
    if (response.code == 200 && shouldRegister){
        let err = await new Promise((resolve,reject)=> {
            req.logIn(user,resolve);
        })
        if (err) response.text += ". Unable to login."
    }
    waitASec(() => res.json(response))
})

router.put('/', async (req, res) => {
    const userToUpdate = req.body;
    let response = await usersDB.updateUser(userToUpdate);
    waitASec(() => res.json(response))
})

module.exports = router;