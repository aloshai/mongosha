const mongodb = require("mongodb");

function formatPath(str) {
    return "data." + str;
}

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
     * 
     * @param {String} path 
     * @param {any} value
     * @returns any 
     */
    async set(path, value) {
        path = formatPath(path);

        await this.#collection.updateOne({ key: this.#key }, { $set: { [path]: value } }, { upsert: true });
        return value;
    }
    /**
     * 
     * @param {String} path 
     */
    async get(path) { // TODO: defaultValue
        path = formatPath(path);

        const data = await this.#collection.findOne({ key: this.#key }, {
            projection: {
                "result": `$${path}`
            }
        });

        return data?.result;
    }

    async sort(path, orderType) {
        path = formatPath(path);

        let pipelines = [
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
                    [`${path}`]: orderType
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
     * 
     * @param {String} path 
     * @param {Number} value 
     * @returns {any}
     */
    async add(path, value) {
        path = formatPath(path);

        const data = await this.#collection.findOneAndUpdate({ key: this.#key }, { $inc: { [path]: value } }, {
            projection: {
                "result": `$${path}`
            },
            upsert: true
        });

        return data?.result;
    }

    /**
     * 
     * @param {String} path 
     * @param {Number} value 
     * @returns {any}
     */
    async sub(path, value) {
        path = formatPath(path);

        const data = await this.#collection.findOneAndUpdate({ key: this.#key }, { $inc: { [path]: -Math.abs(value) } }, {
            projection: {
                "result": `$${path}`
            },
            upsert: true
        });

        return data?.result;
    }

    /**
     * 
     * @param {String} path 
     * @returns {Boolean}
     */
    async has(path) {
        path = formatPath(path);

        const count = await this.#collection.find({ key: this.#key, [path]: { $exists: true } }).limit(1).count();

        return count == 1 ? true : false;
    }

    /**
     * 
     * @param {String} path 
     * @param {any} value 
     * @returns any
     */
    async push(path, value) {
        path = formatPath(path);

        await this.#collection.updateOne({ key: this.#key }, { $push: { [path]: value } }, { upsert: true });

        console.log(path);
        return value;
    }

    /**
     * 
     * @param {String} path 
     * @param {any} value 
     * @returns any
     */
    async pull(path, value) {
        path = formatPath(path);

        await this.#collection.updateOne({ key: this.#key }, { $pull: { [path]: value } }, { upsert: true });
    }

    /**
     * 
     * @param {String} path 
     * @param {any} value 
     * @returns any
     */
    async pullAll(path, value) {
        path = formatPath(path);

        await this.#collection.updateOne({ key: this.#key }, { $pullAll: { [path]: value } }, { upsert: true });
    }
}

module.exports = Data;