var express = require('express');
var router = express.Router();
const flowersDB = require('../flowersDB');
const usersDB = require('../usersDB');

const https = require('https');
const multer = require("multer");
const upload = multer({ dest: "public/images/flowers" });
const path = require('path');
const fs = require('fs');
// you might also want to set some limits: https://github.com/expressjs/multer#limits

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};
//Node.js Function to save image from External URL.
// async function saveImageToDisk(url, localPath) {
//   try{
//   new Promise(resolve =>
//     http.get(url)
//       .pipe(fs.createWriteStream(localPath))
//       .on('finish', (ev)=>{
//         console.log("finish",ev)}))
//         .then((ev1)=>{
//           console.log("then",ev1)});
//     return true;
//   }catch(err){
//     return false;
//   }
// }
function saveImageToDisk(url, localPath) {
var file = fs.createWriteStream(localPath);
var request = https.get(url, function(response) {
response.pipe(file).end(()=>{console.log("something!!!")});
});
}

router.post('/', upload.single("file"), async function (req, res, next) {
  console.log(req.body);
  const supplier = req.body.supplier;
  // delete the supplier key from the flower object so it won't be added to the data
  // saved to the database
  delete req.body.supplier;
  let extname = req.body.img_url;

  if (req.file) {
    extname = path.extname(req.file.originalname).toLowerCase();
  }
  // delete the img_url
  // if the body has file the img_url is not needed
  // if the body does not have file the extname variable holds the img_url
  delete req.body.img_url;  

  let [isSuccess, message, image_name, _id] = await flowersDB.addFlower(req.body, extname);

  if (!isSuccess) {
    res.send({ code: 500, text: message });
  }
  if (req.file){
    const tempPath = req.file.path;
    if (!isSuccess) {
      // remove the file
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);
        // sending the error message
        res.send({ code: 500, text: message });
      });
    }
    const targetPath = `public/images/flowers/${image_name}`;
    // renaming the image to the correct name
    fs.rename(tempPath, targetPath, err => {
      if (err) return handleError(err, res);

    });

  }

  
  // if (!req.file) {
  //   if (!isSuccess) {
  //     res.send({ code: 500, text: message });
  //   }
  //   else {
  //     await saveImageToDisk(img_url, `public/images/flowers/${image_name}`);
  //   }
  // }
  // else //there a req.file
  // {
  //   const tempPath = req.file.path;
  //   if (!isSuccess) {
  //     // remove the file
  //     fs.unlink(tempPath, err => {
  //       if (err) return handleError(err, res);
  //       // sending the error message
  //       res.send({ code: 500, text: message });
  //     });
  //   }
  //   const targetPath = `public/images/flowers/${image_name}`;
  //   // renaming the image to the correct name
  //   fs.rename(tempPath, targetPath, err => {
  //     if (err) return handleError(err, res);

  //   });
  // }


  // updating the supplier of the new flower
  // no need to do await because the user is not waiting for this validation
  try {
    usersDB.addFlowerToSupplier(supplier, _id);
    res.send({ code: 200, text: "Flower Successfully Added!" });
  } catch (err) {
    return handleError(err, res);
  }
});

module.exports = router;
