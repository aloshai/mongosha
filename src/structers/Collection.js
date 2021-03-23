const mongodb = require("mongodb");
const Data = require("./Data");

const FormatTool = require("../tools/FormatTool");

class Collection {
    /**
     * @type {mongodb.Collection}
     */
    Collection;

    /**
     * @param {mongodb.Collection} client 
     */
    constructor(collection) {
        this.Collection = collection;
    }

    /**
     * If data does not exists, creates data then returns the data. Otherwise just returns data.
     * @param {String} key
     * @return {Data} 
     */
    data(key) {
        return new Data(key, this.Collection);
    }

    /**
     * Sorts all data by the value in the specified path.
     * @param {String} path It determines the field where the sorting will be done.
     * @param {("DESC"|"ASC")} orderType Sorts the data in DESC (descending) or ASC (ascending).
     * @param {number} limit It determines the data limit to be received.
     * @return {Array<any>}
     */
    async sort(path, orderType, limit = 0) {
        path = FormatTool(path);

        const order = orderType == "DESC" ? -1 : 1;
        const data = await this.Collection.find({ [path]: { $exists: true } }).sort(path, order).limit(limit).toArray();

        return data;
    }

    /**
     * In all data, the value is assigned to the specified path.
     * @param {String} path
     * @param {any} value
     * @return {mongodb.UpdateWriteOpResult}
     */
    async set(path, value) {
        path = FormatTool(path);

        return await this.Collection.updateMany({}, { $set: { [path]: value } });
    }

    /**
     * Removes a field from all data in the collection.
     * @param {String} path
     * @return {mongodb.UpdateWriteOpResult}
     */
    async delete(path) {
        path = FormatTool(path);

        return await this.Collection.updateMany({}, { $unset: { [path]: "" } });
    }

    /**
     * Perform mathematical addition in the specified path in all data.
     * @param {String} path
     * @param {Number} value
     * @return {mongodb.UpdateWriteOpResult}
     */
    async add(path, value) {
        path = FormatTool(path);

        return await this.Collection.updateMany({}, { $inc: { [path]: Math.abs(value) } });
    }
    /**
     * Perform mathematical subtraction in the specified path in all data.
     * @param {String} path
     * @param {Number} value
     * @return {mongodb.UpdateWriteOpResult}
     */
    async subtract(path, value) {
        path = FormatTool(path);

        return await this.Collection.updateMany({}, { $inc: { [path]: -Math.abs(value) } });
    }

    /**
     * Push value to array in specified path in all data.
     * @param {String} path
     * @param {any} value
     * @return {mongodb.UpdateWriteOpResult}
     */
    async push(path, value) {
        path = FormatTool(path);

        return await this.Collection.updateMany({}, { $push: { [path]: value } });
    }

    /**
     * Values ​​in the specified array are added to all data in the collection in the specified path.
     * @param {String} path
     * @param {any[]} values
     * @return {mongodb.UpdateWriteOpResult}
     */
    async pushRange(path, values) {
        path = FormatTool(path);

        return await this.Collection.updateMany({}, { $push: { [path]: { $each: values } } });
    }

    /**
     * Pull the value from the array in the specified path in all data.
     * @param {String} path
     * @param {any} value
     * @return {mongodb.UpdateWriteOpResult}
     */
    async pull(path, value) {
        path = FormatTool(path);

        return await this.Collection.updateMany({}, { $pull: { [path]: value } });
    }
}

module.exports = Collection;