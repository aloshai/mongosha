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
     * If database does not exists, creates database then returns the database. Otherwise just returns database.
     * @param {String} databaseName
     * @return {Database} 
     */
    database(databaseName) {
        let database = new Database(this.Client, databaseName);
        return database;
    }

    /**
     * Drops the database.
     * @param {String} databaseName 
     * @return {Promise<void>}
     */
    async dropDatabase(databaseName) {
        await this.Client.db(databaseName).dropDatabase();
    }
}

module.exports = Client;