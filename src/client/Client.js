const mongodb = require("mongodb");
const Database = require("../structers/Database");

class Client {
    /**
     * @type {mongodb.MongoClient}
     */
    Client;

    /**
     * @param {MongoClient} client 
     */
    constructor(client) {
        this.Client = client;
    }

    /**
     * Creates a database. (If the database has already been created, it won't rebuild)
     * @param {String} databaseName
     * @returns {Database} 
     */
    database(databaseName) {
        let database = new Database(this.Client, databaseName);
        return database;
    }
    
    /**
     * Drops the database.
     * @param {String} databaseName 
     */
    async dropDatabase(databaseName) {
        await this.Client.db(databaseName).dropDatabase();
    }
}

module.exports = Client;