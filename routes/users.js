var express = require('express');
var router = express.Router();
const usersDB = require('../usersDB');

/* GET users listing. */

waitASec = (func) => {
    setTimeout(func, 1000);
}

// router.post('/', async(req,res)=> {
//     let customerHeaders = ["phone","email","username"];
//   let canEditCustomer = false;
// })


router.post('/', async (req, res) => {
  let customerHeaders = ["phone","email","username"];
  let canEditCustomer = false;
  let position = await usersDB.getUserPosition(req.body.username);
  if ( position === "manager") {
      customerHeaders.push("password");
      canEditCustomer = true;
  }
  let objectElement = {
      headers: ["phone", "email", "username", "password", "branch", "payment", "position", "flowers"],
      positions: {
          customers: {
              position: "customer",
              positionPlural: "Customers",
              positionSingle: "Customer",
              modal: "#customerModal",
              headers: customerHeaders,
              canEdit: canEditCustomer,
              users: await usersDB.getListOf("customer")
          }
      }
  }
  if (position === "manager"){
      objectElement.positions.workers = {
          position: "worker",
          positionPlural: "Employees",
          positionSingle: "Employee",
          modal: "#workerModal",
          headers: ["phone","email","username","password","branch","payment","position"],
          canEdit: true,
          users: await usersDB.getListOf("worker")
      }

      objectElement.positions.managers = {
          position: "manager",
          positionPlural: "Managers",
          positionSingle: "Manager",
          modal: "#workerModal",
          headers: ["phone","email","username","password","branch","payment","position"],
          canEdit: true,
          users: await usersDB.getListOf("manager")
      }

      let supplierHeaders = [...customerHeaders, "flowers"];
      objectElement.positions.suppliers = {
          position: "supplier",
          positionPlural: "Suppliers",
          positionSingle: "Supplier",
          modal: "#supplierModal",
          headers: supplierHeaders,
          canEdit: true,
          users: await usersDB.getListOf("supplier")
      }
  }
  waitASec(() => res.render('users',objectElement));
})


module.exports = router;
