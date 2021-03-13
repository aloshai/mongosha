const mongodb = require('mongodb');
const Client = require('./structers/Client');

class Manager {
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

module.exports = {
    Manager
};