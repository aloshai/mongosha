const mongodb = require("mongodb");
const Database = require("../structers/Database");

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
        let database = new Database(this.client, databaseName);
        return database;
    }

    async dropDatabase(databaseName) {
        await this.client.db(databaseName).dropDatabase();
    }
}

module.exports = Client;