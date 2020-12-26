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
     * @param {String} path 
     * @param {any} value 
     */
    async set(path, value){
        path = this.formatPath(path);
        return Serialize.get(path, await Any.findOneAndUpdate({Key: this.Name}, {$set: {[path]: value}}, {upsert: true, new: true}).select(path).exec());
    }

    /**
     * @param {String} path 
     */
    async get(path){
        path = this.formatPath(path);
        let data = Serialize.get(path, await Any.findOne({Key: this.Name}, {_id: 0}).select(path).exec());
        if(Object.keys(data).length == 0) return undefined;
        return data;
    }
    
    /**
     * @param {String} path 
     * @param {any} value 
     */
    async push(path, value){
        path = this.formatPath(path);
        return Serialize.get(path, await Any.findOneAndUpdate({Key: this.Name}, {$push: {[path]: value}}, {upsert: true, new: true}).select(path).exec());
    }

    /**
     * @param {String} path 
     */
    async has(path){
        path = this.formatPath(path);
        return await Any.exists({Key: this.Name, [path]: {$exists: true}}).then((val) => val);
    }

    /**
     * @param {String} path 
     * @param {Number} value
     */
    async add(path, value){
        value = Number(value);
        if(isNaN(value)) throw "Invalid Number";
        path = this.formatPath(path);
        return Serialize.get(path, await Any.findOneAndUpdate({Key: this.Name}, {$inc: {[path]: value}}, {upsert: true, new: true}).select(path).exec());
    }

    /**
     * @param {String} path 
     * @param {Number} value
     */
    async sub(path, value){
        value = Number(value);
        if(isNaN(value)) throw "Invalid Number";
        path = this.formatPath(path);
        return Serialize.get(path, (await Any.findOneAndUpdate({Key: this.Name}, {$inc: {[path]: -value}}, {upsert: true, new: true}).select(path).exec()));
    }

    /**
     * @param {Number} path 
     * @param {Object} query 
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