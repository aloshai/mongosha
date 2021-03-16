const mongodb = require('mongodb');
const Client = require('./client/Client');

class Mongosha {
    /**
     * @param {String} url 
     * @param {mongodb.MongoClientOptions} options 
     * @returns {Client}
     */
    static connect = async function (url, options = undefined) {
        let mongoClient = await mongodb.connect(url, options);
        let client = new Client(mongoClient);

        return client;
    }
}

module.exports = Mongosha;