const mongodb = require('mongodb');
const { Client } = require('./src/client/Client.js');

const { Collection } = require("./src/structers/Collection.js");
const { Data } = require("./src/structers/Data.js");
const { Database } = require("./src/structers/Database.js");

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