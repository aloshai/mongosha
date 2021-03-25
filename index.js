const { MongoClientOptions, connect } = require('mongodb');

const { Client } = require('./src/client/Client.js');
const { Collection } = require("./src/structers/Collection.js");
const { Data } = require("./src/structers/Data.js");
const { Database } = require("./src/structers/Database.js");

class Mongosha {
    /**
     * Creates a new client and connects to MongoDB. (Connects to socket)
     * @param {String} url 
     * @param {MongoClientOptions} options 
     * @return {Promise<Client>}
     */
    static connect = async function (url, options = undefined) {
        const mongoClient = await connect(url, options);
        return new Client(mongoClient);
    }
}

module.exports = { Mongosha, Client, Database, Collection, Data };