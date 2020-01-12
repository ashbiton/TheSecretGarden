const Branch = require('./model')("Branch");
const debug = require("debug")("mongo:model-branch-db");

exports.getBranchesList = async () => {
    let result = [];
    await Branch.REQUEST({},(b)=>{result.push(b)});
    // debug(`the branches found are ${result}`);
    return result;
}

exports.getBranchesNumbers = async () => {
    let result = [];
    await Branch.REQUEST({},{number:1},(b)=>{result.push(b.number)});
    // debug(`the branches found are ${result}`);    
    return result;
}