const debug = require("debug")("mongo:model-user");
const mongo = require("mongoose");

module.exports = db => {
    let schema = new mongo.Schema({
        name: {type: String, required: true , index: true},
        img: String,
        cost: {type: Number, required: true},
        color: [String]
    });

    schema.statics.CREATE = function (flower) {
        return this.create(flower);
    }

    schema.statics.REQUEST_SORT = async function (findArgs , sortArgs , callback) {
        if (callback instanceof Function){
            let asynch = callback.constructor.name === 'AsyncFunction';
            debug(`request: with ${asynch?'async':'sync'} callback`);
            let cursor, flower;
            try {
                cursor = await this.find(findArgs).sort(sortArgs).cursor();
            } catch (err) { throw err; }
            try {
                while (null !== (flower = await cursor.next())) {
                    if (asynch) {
                        try {
                            await callback(flower);
                        } catch (err) { throw err; }
                    }
                    else {
                        callback(flower);
                    }
                }
            } catch (err) { throw err; }
            return;
        }
        debug(`request: without callback`);
        return this.find(findArgs).sort(sortArgs).exec();
    }

    schema.statics.REQUEST = async function () {
        // no arguments - bring all at once
        const args = Array.from(arguments); // [...arguments]
        if (args.length === 0) {
            debug("request: no arguments - bring all at once");
            return this.find({}).exec();
        }

        // perhaps last argument is a callback for every single document
        let callback = arguments[arguments.length - 1];
        if (callback instanceof Function) {
            let asynch = callback.constructor.name === 'AsyncFunction';
            debug(`request: with ${asynch?'async':'sync'} callback`);
            args.pop();
            let cursor, flower;
            try {
                cursor = await this.find(...args).cursor();
            } catch (err) { throw err; }
            try {
                while (null !== (flower = await cursor.next())) {
                    if (asynch) {
                        try {
                            await callback(flower);
                        } catch (err) { throw err; }
                    }
                    else {
                        callback(flower);
                    }
                }
            } catch (err) { throw err; }
            return;
        }

        // request by id as a hexadecimal string
        if (args.length === 1 && typeof args[0] === "string") {
            debug("request: by ID");
            return this.findById(args[0]).exec();
        }

        // There is no callback - bring requested at once
        debug(`request: without callback: ${JSON.stringify(args)}`);
        return this.find(...args).exec();
    };

    db.model('Flower', schema, 'Flowers'); 
}