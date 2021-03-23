const mongodb = require("mongodb");
const PathFormat = require("../tools/FormatTool");

class Data {
    /**
     * @type {mongodb.Collection}
     */
    #collection;
    /**
     * @type {String}
     */
    #key;

    /**
     * 
     * @param {String} key 
     * @param {mongodb.Collection} collection 
     */
    constructor(key, collection) {
        this.#key = key;
        this.#collection = collection;
    }

    /**
     * Assign to the specified path.
     * @param {String} path
     * @param {any} value Value to  be assigned.
     * @returns any 
     */
    async set(path, value) {
        path = PathFormat(path);

        await this.#collection.updateOne({ key: this.#key }, { $set: { [path]: value } }, { upsert: true });
        return value;
    }

    /**
     * Deletes the specified path.
     * @param {String} path  
     * @returns Promise<void>
     */
    async delete(path) {
        path = PathFormat(path);

        await this.#collection.updateOne({ key: this.#key }, { $unset: { [path]: "" } });
        return;
    }

    /**
     * Returns the value/object at the specified path.
     * @param {String} path  
     */
    async get(path) {
        path = PathFormat(path);

        const data = await this.#collection.findOne({ key: this.#key }, {
            projection: {
                "result": `$${path}`
            }
        });

        return data?.result;
    }

    /**
     * Sorts the array/values ​​in path.
     * @param {String} path  
     * @param {("DESC"|"ASC")} orderType Sorts the data in DESC (descending) or ASC (ascending).
     * @returns 
     */
    async sort(path, orderType) {
        path = PathFormat(path);

        const order = orderType == "DESC" ? -1 : 1;
        const pipelines = [
            {
                '$match': {
                    'key': this.#key
                }
            }, {
                '$unwind': {
                    'path': `$${path}`
                }
            }, {
                '$sort': {
                    [`${path}`]: order
                }
            }, {
                '$project': {
                    'element': `$${path}`
                }
            }
        ];

        let result = (await this.#collection.aggregate(pipelines).toArray()).map(e => e.element);
        return result;
    }

    /**
     * Do mathematical addition to specified path.
     * @param {String} path
     * @param {Number} value
     * @returns {any}
     */
    async add(path, value) {
        path = PathFormat(path);

        const data = await this.#collection.findOneAndUpdate({ key: this.#key }, { $inc: { [path]: value } }, {
            projection: {
                "result": `$${path}`
            },
            upsert: true
        });

        return data?.result;
    }

    /**
     * Do mathematical subtraction to specified path.
     * @param {String} path
     * @param {Number} value
     * @returns {any}
     */
    async subtract(path, value) {
        path = PathFormat(path);

        const data = await this.#collection.findOneAndUpdate({ key: this.#key }, { $inc: { [path]: -Math.abs(value) } }, {
            projection: {
                "result": `$${path}`
            },
            upsert: true
        });

        return data?.result;
    }

    /**
     * Check if Field exists to specified path.
     * @param {String} path
     * @returns {Boolean}
     */
    async has(path) {
        path = PathFormat(path);

        const data = await this.#collection.findOne({ key: this.#key, [path]: { $exists: true } }, {
            projection: {
                "_id": 1
            }
        });
        return data;
    }

    /**
     * Push to value an array to specified path.
     * @param {String} path
     * @param {any} value
     * @returns any
     */
    async push(path, value) {
        path = PathFormat(path);

        await this.#collection.updateOne({ key: this.#key }, { $push: { [path]: value } }, { upsert: true });
        return value;
    }

    /**
     * Push to multiple values an array to specified path.
     * @param {String} path
     * @param {any[]} values 
     * @returns any
     */
    async pushRange(path, values) {
        path = PathFormat(path);

        await this.#collection.updateOne({ key: this.#key }, { $push: { [path]: { $each: values } } }, { upsert: true });
        return value;
    }

    /**
     * Extract element from Array to specified path.
     * @param {String} path
     * @param {any} value 
     * @returns any
     */
    async pull(path, value) {
        path = PathFormat(path);

        await this.#collection.updateOne({ key: this.#key }, { $pull: { [path]: value } }, { upsert: true });
    }

    /**
     * Extract all elements from Array to specified path.
     * @param {String} path
     * @param {any} value 
     * @returns any
     */
    async pullAll(path, value) {
        path = PathFormat(path);

        await this.#collection.updateOne({ key: this.#key }, { $pullAll: { [path]: value } }, { upsert: true });
    }
}

module.exports = Data;