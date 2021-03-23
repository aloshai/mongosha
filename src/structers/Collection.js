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
     * @returns {Data} 
     */
    data(key) {
        return new Data(key, this.Collection);
    }

    /**
     * Sorts all data by the value in the specified path.
     * @param {String} path It determines the field where the sorting will be done.
     * @param {("DESC"|"ASC")} orderType Sorts the data in DESC (descending) or ASC (ascending).
     * @param {number} limit It determines the data limit to be received.
     * @returns {Array<any>}
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
     * @returns {mongodb.UpdateWriteOpResult}
     */
    async set(path, value) {
        path = FormatTool(path);

        return await this.Collection.updateMany({ [path]: { $exists: true } }, { $set: { [path]: value } });
    }

    /**
     * Perform mathematical addition in the specified path in all data.
     * @param {String} path
     * @param {Number} value
     * @returns {mongodb.UpdateWriteOpResult}
     */
    async add(path, value) {
        path = FormatTool(path);

        return await this.Collection.updateMany({ [path]: { $exists: true } }, { $inc: { [path]: Math.abs(value) } });
    }
    /**
     * Perform mathematical subtraction in the specified path in all data.
     * @param {String} path
     * @param {Number} value
     * @returns {mongodb.UpdateWriteOpResult}
     */
    async subtract(path, value) {
        path = FormatTool(path);

        return await this.Collection.updateMany({ [path]: { $exists: true } }, { $inc: { [path]: -Math.abs(value) } });
    }

    /**
     * Push value to array in specified path in all data.
     * @param {String} path
     * @param {any} value
     * @returns @returns {mongodb.UpdateWriteOpResult}
     */
    async push(path, value) {
        path = FormatTool(path);

        return await this.Collection.updateMany({ [path]: { $exists: true } }, { $push: { [path]: value } });
    }

    /**
     * Pull the value from the array in the specified path in all data.
     * @param {String} path
     * @param {any} value
     * @returns @returns {mongodb.UpdateWriteOpResult}
     */
    async pull(path, value) {
        path = FormatTool(path);

        return await this.Collection.updateMany({ [path]: { $exists: true } }, { $pull: { [path]: value } });
    }
}

module.exports = Collection;