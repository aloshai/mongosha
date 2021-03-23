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
     * 
     * @param {String} path 
     * @param {("DESC"|"ASC")} orderType
     * @param {number} limit
     * @returns {Array<any>}
     */
    async sort(path, orderType, limit = 0) {
        path = FormatTool(path);

        const order = orderType == "DESC" ? -1 : 1;
        const data = await this.Collection.find({ [path]: { $exists: true } }).sort(path, order).limit(limit).toArray();

        return data;
    }

    /**
     * 
     * @param {String} path 
     * @param {any} value 
     * @returns {mongodb.UpdateWriteOpResult}
     */
    async set(path, value) {
        path = FormatTool(path);

        return await this.Collection.updateMany({ [path]: { $exists: true } }, { $set: { [path]: value } });
    }

    /**
     * 
     * @param {String} path 
     * @param {Number} value 
     * @returns {mongodb.UpdateWriteOpResult}
     */
    async add(path, value) {
        path = FormatTool(path);

        return await this.Collection.updateMany({ [path]: { $exists: true } }, { $inc: { [path]: Math.abs(value) } });
    }
    /**
     * 
     * @param {String} path 
     * @param {Number} value 
     * @returns {mongodb.UpdateWriteOpResult}
     */
    async sub(path, value) {
        path = FormatTool(path);

        return await this.Collection.updateMany({ [path]: { $exists: true } }, { $inc: { [path]: -Math.abs(value) } });
    }

    /**
     * 
     * @param {String} path 
     * @param {any} value 
     * @returns @returns {mongodb.UpdateWriteOpResult}
     */
    async push(path, value) {
        path = FormatTool(path);

        return await this.Collection.updateMany({ [path]: { $exists: true } }, { $push: { [path]: value } });
    }

    /**
     * 
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