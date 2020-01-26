var express = require('express');
var router = express.Router();
const usersDB = require('../usersDB');

/* GET users listing. */

waitASec = (func) => {
    setTimeout(func, 1000);
}

router.get('/', async (req, res) => {
    let customerHeaders = ["phone", "email", "username"];
    let canEditCustomer = false;
    // let position = await usersDB.getUserPosition(req.body.username);
    let position = "manager";
    if (position === "manager") {
        customerHeaders.push("password");
        canEditCustomer = true;
    }
    let objectElement = [
        {
            position: "customer",
            positionPlural: "Customers",
            headers: customerHeaders,
            canEdit: canEditCustomer,
            users: await usersDB.getListOf("customer")
        }
    ]
    if (position === "manager") {

        let workerHeaders = [...customerHeaders, "branch", "payment", "position"]
        objectElement.push({
            position: "employee",
            positionPlural: "Employees",
            headers: workerHeaders,
            canEdit: true,
            users: await usersDB.getListOf("employee")
        })

        objectElement.push({
            position: "manager",
            positionPlural: "Managers",
            headers: workerHeaders,
            canEdit: true,
            users: await usersDB.getListOf("manager")
        })

        let supplierHeaders = [...customerHeaders, "flowers"];
        objectElement.push({
            position: "supplier",
            positionPlural: "Suppliers",
            headers: supplierHeaders,
            canEdit: true,
            users: await usersDB.getListOf("supplier")
        })
    }
    waitASec(() => res.json({ 'users': objectElement }));
})


module.exports = router;
