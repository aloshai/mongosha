const mongodb = require("mongodb");
const Database = require("./Database");

class Client {
    /**
     * @type {mongodb.MongoClient}
     */
    client;

    /**
     * @param {MongoClient} client 
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * 
     * @param {String} databaseName
     * @returns {Database} 
     */
    database(databaseName) {
        var database = new Database(this.client, databaseName);
        return database;
    }
}

module.exports = Client;