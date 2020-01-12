const User = require('./model')("User");
const debug = require("debug")("mongo:model-user-db");

// user findOne and not REQUEST because if username does not exists 
// REQUEST returns an empty array and findOne returns null 

exports.getUserByPositionHeaders = async (args) => {
    // args is the identifier of the user
    //create a string of projection
    // await User.findOne(args,)
}
exports.getHeadersForPosition = (position , includePassword) => {
    let customerHeaders = ["name","surname","email","phone", "username"];
    if (includePassword) customerHeaders.push('password');
    let workerHeaders = [...customerHeaders, "payment","branch","position"];
    let supplierHeaders = [...customerHeaders , "flowers"];
    switch (position) {
        case "manager":
        case "worker":
            return workerHeaders;
        case "supplier":
            return supplierHeaders;
        default: 
            return customerHeaders;
    }
}
exports.isThereUser = async (username, password) => {
    let user = await User.findOne({ username: username, password: password }).exec();
    // debug(`the user found for is there user is ${user}`)
    if (user) return true;
    return false;
}


exports.getUserPosition = async (username) => {
    let user = await User.findOne({ username: username }, { position: 1 }).exec();
    // debug(`the user found for position is ${user.position}`)
    if (user) return user.position;
    return "customer";
}

exports.getListOf = async (position) => {
    let result = [];
    await User.REQUEST({ position: position }, (user) => { result.push(user) });
    // debug(`the users found for this position are ${result}`);
    return result;
}

exports.findOne = async (args) => {
    return User.findOne(args);
}

exports.getAllPositions = async () => {
    let positions = [];
    await User.REQUEST({}, { position: 1 },
        (user) => {
            if (!positions.includes(user.position)) {
                positions.push(user.position);
            }
        })
    // debug(`the position found are ${positions}`);
    return positions;
}

exports.resetUserPassword = async (user,password) => {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.setPassword(password);
    await user.save();
}

exports.addUser = async (userObj) => {
    if (!userObj["username"] || !userObj["password"]) {
        return { code: 404, text: "User Must Have Username and Password" };
    }
    let username = userObj.username
    let user = await User.findOne({ username: username });
    if (user) {
        return { code: 404, text: "Username already exists" };
    }
    try {
        let password = userObj.password;
        delete userObj.password;
        let user = new User(userObj);
        await user.setPassword(password);
        await user.save();
        // const { user } = await DefaultUser.authenticate()('user', 'password');
        console.log(user);
        return [{ code: 200, text: "User Successfully Added" } , user]
    } catch (err) {
        console.log(`error adding user : ${err}`);
        return [{ code: 404, text: "Error Adding User" },null]
    }
}

exports.deleteUser = async (username) => {
    let user = await User.findOne({ username: username }).exec();
    if (user) {
        try {
            await User.deleteOne({ username: username }).exec();
            return true
        } catch (err) {
            debug(`error deleting user ${username} : ${err}`)
        }
    }
    return false;

}

exports.updateCurrUser = async (currUsername, updatedUserObj) => {
        await User.findOneAndUpdate({username: currUsername},updatedUserObj);  
}

exports.updateUser = async (updatedUserObj) => {
    if (!updatedUserObj.username || !updatedUserObj.password) {
        return { code: 404, text: "User Must Have Username and Password" };
    }
    let username = updatedUserObj.username;
    let user = await User.findOne({ username: username }).exec();
    if (!user) {
        return { code: 404, text: "Username does not exists" };
    }
    debug(`user to update is ${user} ${typeof user}`);
    debug(`update info ${Object.keys(updatedUserObj)}`)

    try {
        let password = updatedUserObj.password;
        delete updatedUserObj.password;
        await User.findOneAndUpdate({username: username},updatedUserObj);
        await user.setPassword(password);
        await user.save();
        return { code: 200, text: "User Successfully Updated" };
    } catch (error) {
        debug(`error while updating user ${username} : ${error}`);
        return { code: 404, text: "unable to update user" };        
    }
}

exports.addFlowerToSupplier = async (supplier , flowerID) => {
    let user = await User.findOne({username : supplier});
    if (!user || user.position !== "supplier"){
        throw "the user is not a supplier";
    }
    await User.updateOne({username: supplier},{$push : {flowers: flowerID}});
    console.log("flower added to supplier")
}

