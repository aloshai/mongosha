const Any = require("../schemas/EasyMongoSchema");
const Serialize = require("../structers/Serialize");

class Database {
    /**
     * @param {String} name 
     */
    constructor(name){
        this.Name = name;
    }

    /**
     * Set a value to the path you specify.
     * @param {String} path The path where the transaction will be made.
     * @param {any} value The value to be assigned to the path.
     * @returns {Object} If force is true, returns an object.
     */
    async set(path, value){
        path = this.formatPath(path);
        return Serialize.get(path, await Any.findOneAndUpdate({Key: this.Name}, {$set: {[path]: value}}, {upsert: true, new: true}).select(path).exec());
    }

    /**
     * Returns value to you from the path you specified.
     * @param {String} path The path where the transaction will be made.
     */
    async get(path){
        path = this.formatPath(path);
        let data = Serialize.get(path, await Any.findOne({Key: this.Name}, {_id: 0}).select(path).exec());
        if(Object.keys(data).length == 0) return undefined;
        return data;
    }
    
    /**
     * If the path you specify is an array, it pushes a value into the array.
     * @param {String} path The path where the transaction will be made.
     * @param {any} value The value to be pushed.
     * @returns {Array} If force is true, returns an updated array.
     */
    async push(path, value){
        path = this.formatPath(path);
        return Serialize.get(path, await Any.findOneAndUpdate({Key: this.Name}, {$push: {[path]: value}}, {upsert: true, new: true}).select(path).exec());
    }

    /**
     * It checks to see if the path you specified exists.
     * @param {String} path The path where the transaction will be made.
     * @returns {Boolean} true or false
     */
    async has(path){
        path = this.formatPath(path);
        return await Any.exists({Key: this.Name, [path]: {$exists: true}}).then((val) => val);
    }

    /**
     * Adds a numeric value in the path you specified.
     * @param {String} path The path where the transaction will be made.
     * @param {Number} value Value to add.
     * @returns {Number} returns an updated value
     */
    async add(path, value){
        value = Number(value);
        if(isNaN(value)) throw "Invalid Number";
        path = this.formatPath(path);
        return Serialize.get(path, await Any.findOneAndUpdate({Key: this.Name}, {$inc: {[path]: value}}, {upsert: true, new: true}).select(path).exec());
    }

    /**
     * @param {String} path The path where the transaction will be made.
     * @param {Number} value Value to substract.
     * @returns {Number} returns an updated value
     */
    async sub(path, value){
        value = Number(value);
        if(isNaN(value)) throw "Invalid Number";
        path = this.formatPath(path);
        return Serialize.get(path, (await Any.findOneAndUpdate({Key: this.Name}, {$inc: {[path]: -value}}, {upsert: true, new: true}).select(path).exec()));
    }

    /**
     * If the path you specified is an array, it will delete a value based on the query you specified.
     * @param {String} path The path where the transaction will be made.
     * @param {Object} query The value to be pushed.
     * @returns {Array} If force is true, returns an updated array.
     */
    async pull(path, query){
        path = this.formatPath(path);
        return Serialize.get(path, (await Any.findOneAndUpdate({Key: this.Name}, { $pull: { [path]: query } }, {upsert: true, new: true}).exec()));
    }

    /**
     * @param {String} str 
     */
    formatPath(str) {
        if(!str.length) str = "Value";
        else str = `Value.${str}`;
        return str;
    }
}

module.exports = Database;