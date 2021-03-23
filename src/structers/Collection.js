const mongodb = require("mongodb");
const Data = require("./Data");

class Collection {
    /**
     * @type {mongodb.Collection}
     */
    collection;

    /**
     * @param {mongodb.Collection} client 
     */
    constructor(collection) {
        this.collection = collection;
    }

    /**
     * 
     * @param {String} key
     * @returns {Data} 
     */
    data(key) {
        return new Data(key, this.collection);
    }

    /**
     * 
     * @param {String} key
     * @returns {Data} 
     */
    CreateData(key) {
        return new Data(key, this.collection);
    }

    /**
     * 
     * @param {String} path 
     * @param {("DESC"|"ASC")} orderType
     * @param {number} limit
     * @returns {Array<any>}
     */
    async sort(path, orderType, limit = 0) {
        const order = orderType == "DESC" ? -1 : 1;
        const data = await this.collection.find({ [path]: { $exists: true } }).sort(path, order).limit(limit).toArray();

        return data;
    }

    /**
     * 
     * @param {String} path 
     * @param {any} value 
     * @returns {mongodb.UpdateWriteOpResult}
     */
    async UpdateSet(path, value) {
        return await this.collection.updateMany({ [path]: { $exists: true } }, { $set: { [path]: value } });
    }

    /**
     * 
     * @param {String} path 
     * @param {Number} value 
     * @returns {mongodb.UpdateWriteOpResult}
     */
    async UpdateAdd(path, value) {
        return await this.collection.updateMany({ [path]: { $exists: true } }, { $inc: { [path]: Math.abs(value) } });
    }
    /**
     * 
     * @param {String} path 
     * @param {Number} value 
     * @returns {mongodb.UpdateWriteOpResult}
     */
    async UpdateSub(path, value) {
        return await this.collection.updateMany({ [path]: { $exists: true } }, { $inc: { [path]: -Math.abs(value) } });
    }

    /**
     * 
     * @param {String} path 
     * @param {any} value 
     * @returns @returns {mongodb.UpdateWriteOpResult}
     */
    async UpdatePush(path, value) {
        return await this.collection.updateMany({ [path]: { $exists: true } }, { $push: { [path]: value } });
    }

    /**
     * 
     * @param {String} path 
     * @param {any} value 
     * @returns @returns {mongodb.UpdateWriteOpResult}
     */
    async UpdatePull(path, value) {
        return await this.collection.updateMany({ [path]: { $exists: true } }, { $pull: { [path]: value } });
    }
}

module.exports = Collection;