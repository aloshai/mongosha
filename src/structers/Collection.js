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
}

module.exports = Collection;