const mongodb = require('mongodb');
const Client = require('./client/Client');

const Collection = require("./structers/Collection");
const Data = require("./structers/Data");
const Database = require("./structers/Database");

class Mongosha {
    /**
     * Creates a new client and connects to MongoDB. (Connects to socket)
     * @param {String} url 
     * @param {mongodb.MongoClientOptions} options 
     * @return {Promise<Client>}
     */
    static connect = async function (url, options = undefined) {
        let mongoClient = await mongodb.connect(url, options);
        let client = new Client(mongoClient);

        return client;
    }
}

module.exports = { Mongosha, Collection, Data, Database, Client };