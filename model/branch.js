const debug = require("debug")("mongo:model-branch");
const mongo = require("mongoose");

module.exports = db => {
    let schema = new mongo.Schema({
        number: { type: Number, required: true, unique: true, index: true },
        house: Number,
        street: String,
        city: String,
        phone: String,
    });

    schema.statics.CREATE = function (branch) {
        return this.create(branch);
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
            let cursor, branch;
            try {
                cursor = await this.find(...args).cursor();
            } catch (err) { throw err; }
            try {
                while (null !== (branch = await cursor.next())) {
                    if (asynch) {
                        try {
                            await callback(branch);
                        } catch (err) { throw err; }
                    }
                    else {
                        callback(branch);
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

    db.model('Branch', schema, 'Branches'); 
}