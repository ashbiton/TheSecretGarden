// flowers info http://www.all-my-favourite-flower-names.com/list-of-flower-names-J-K.html
const Flower = require('./model')("Flower");
const debug = require("debug")("mongo:model-flower-db");

exports.getFlowersList = async () => {
    let result = [];
    await Flower.REQUEST_SORT({},{name: 1}, (flower) => { result.push(flower) });
    return result;

}

function convertToImageName(string){
    let words = string.split(/\s+/);
    let result = "";
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        result += word.toLowerCase();
        if (i < words.length - 1)
            result += "_";
    }
    return result;
}
exports.addFlower = async (data , imageExt) => {
    let insertData = {};
    Object.keys(data).map((key) => {
        if (key == "cost") {
            try {
                insertData.cost = parseFloat(data[key]);
            }
            catch (err) {
                return [false, { code: 404, text: "Flower cost is not valid" }];
            }
        }
        else {
            insertData[key] = data[key];
        }
    });
    if (insertData.color.length == 0){
        return [false , { code: 404, text: "Flower must have at least on color" }];
    }
    let image_name = convertToImageName(insertData.name);
    if (image_name.length === 0) {
        return [false, { code: 404, text: "Flower name is not valid" }];
    }
    if (imageExt == ".png" || imageExt === ".jpeg" || imageExt === ".jpg"){
        insertData.img = image_name+imageExt;
    }
    else {
        if(imageExt.includes("http") || imageExt.includes("base64")){
            insertData.img = imageExt;
        }
        else {
            return [false, { code: 404, text: "Flower image must be a png, jpeg or jpg" }];  
        }
    }
    try {
        let doc = await Flower.create(insertData);
        return [true, null, doc.img , doc._id];
    } catch (err) {
        debug(`error adding user : ${err}`);
        return [false, { code: 404, text: "Error Adding Flower" }];
    }
}