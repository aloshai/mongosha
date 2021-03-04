const MongoshaModel = require("../models/MongoshaModel");
const Serialize = require("../structers/Serialize");

/**
 * @param {String} str
 */
function FormatPath(str) {
    if (!str.length) str = "Value";
    else str = `Value.${str}`;
    return str;
}

class Database {
    /**
     * @param {String} name
     */
    constructor(name, collectionName = undefined) {
        this.Key = name;
        this.Model = collectionName ? MongoshaModel.newModel(collectionName) : MongoshaModel.model;
    }

    /**
     * Set a value to the path you specify.
     * @param {String} path The path where the transaction will be made.
     * @param {any} value The value to be assigned to the path.
     * @param {boolean} returnData Return the data in the field you updated?
     * @returns {Object} If force is true, returns an object.
     */
    async set(path, value, returnData = false) {
        path = FormatPath(path);
        if (returnData) return Serialize.get(path, await this.Model.findOneAndUpdate({ Key: this.Key }, { $set: { [path]: value } }, { upsert: true, new: true }).select(path).exec());
        return this.Model.updateOne({ Key: this.Key }, { $set: { [path]: value } }, { upsert: true, new: true }).exec();
    }

    /**
     * Returns value to you from the path you specified.
     * @param {String} path The path where the transaction will be made.
     */
    async get(path) {
        path = FormatPath(path);
        let data = Serialize.get(path, await this.Model.findOne({ Key: this.Key }, { _id: 0 }).select(path).exec());
        return data;
    }

    /**
     * If the path you specify is an array, it pushes a value into the array.
     * @param {String} path The path where the transaction will be made.
     * @param {any} value The value to be pushed.
     * @param {boolean} returnData Return the data in the field you updated?
     * @returns {Array} If force is true, returns an updated array.
     */
    async push(path, value, returnData = false) {
        path = FormatPath(path);
        if (returnData) return Serialize.get(path, await this.Model.findOneAndUpdate({ Key: this.Key }, { $push: { [path]: value } }, { upsert: true, new: true }).select(path).exec());
        return this.Model.updateOne({ Key: this.Key }, { $push: { [path]: value } }, { upsert: true, new: true }).exec();
    }

    async pushRange(path, value, returnData = false) {
        path = FormatPath(path);
        if (returnData) return Serialize.get(path, await this.Model.findOneAndUpdate({ Key: this.Key }, { $push: { [path]: { $each: value } } }, { upsert: true, new: true }).select(path).exec());
        return this.Model.updateOne({ Key: this.Key }, { $push: { [path]: { $each: value } } }, { upsert: true, new: true }).exec();
    }

    /**
     * If the path you specified is an array, it will delete a value based on the query you specified.
     * @param {String} path The path where the transaction will be made.
     * @param {Object} value The value to be pushed.
     * @param {boolean} returnData Return the data in the field you updated?
     * @returns {Array} If force is true, returns an updated array.
     */
    async pull(path, value, returnData = false) {
        if (Array.isArray(value)) value = [value];
        path = FormatPath(path);
        if (returnData) return Serialize.get(path, (await this.Model.findOneAndUpdate({ Key: this.Key }, { $pull: { [path]: value } }, { upsert: true, new: true }).exec()));
        return this.Model.updateOne({ Key: this.Key }, { $pull: { [path]: value } }, { upsert: true, new: true }).exec();
    }

    async pullAll(path, value, returnData) {
        if (Array.isArray(value)) value = [value];
        path = FormatPath(path);
        if (returnData) return Serialize.get(path, (await this.Model.findOneAndUpdate({ Key: this.Key }, { $pullAll: { [path]: value } }, { upsert: true, new: true }).exec()));
        return this.Model.updateOne({ Key: this.Key }, { $pullAll: { [path]: value } }, { upsert: true, new: true }).exec();
    }

    /**
     * It checks to see if the path you specified exists.
     * @param {String} path The path where the transaction will be made.
     * @returns {Boolean} true or false
     */
    async has(path) {
        path = FormatPath(path);
        return this.Model.exists({ Key: this.Key, [path]: { $exists: true } });
    }

    /**
     * Adds a numeric value in the path you specified.
     * @param {String} path The path where the transaction will be made.
     * @param {Number} value Value to add.
     * @returns {Number} returns an updated value
     */
    async add(path, value) {
        value = Number(value);
        if (isNaN(value)) throw "Invalid Number";
        path = FormatPath(path);
        return Serialize.get(path, await this.Model.findOneAndUpdate({ Key: this.Key }, { $inc: { [path]: value } }, { upsert: true, new: true }).select(path).exec());
    }

    /**
     * @param {String} path The path where the transaction will be made.
     * @param {Number} value Value to subtract.
     * @returns {Number} returns an updated value
     */
    async sub(path, value) {
        value = Number(value);
        if (isNaN(value)) throw "Invalid Number";
        path = FormatPath(path);
        return Serialize.get(path, (await this.Model.findOneAndUpdate({ Key: this.Key }, { $inc: { [path]: -value } }, { upsert: true, new: true }).select(path).exec()));
    }

    /**
     * Unset the data in the path you specified.
     * @param {String} path The path where the transaction will be made.
     */
    async delete(path) {
        path = FormatPath(path);
        return this.Model.updateOne({ Key: this.Key }, { $unset: { [path]: 1 } }, { upsert: true }).exec();
    }

}

module.exports = Database;