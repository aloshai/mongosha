const mongodb = require("mongodb");
const Collection = require("./Collection");

class Database {

    /**
     * @type {mongodb.Db}
     */
    Db;

    /**
     * @type {mongodb.MongoClient}
     */
    Client;

    /**
     * 
     * @param {mongodb.MongoClient} client 
     * @param {mongodb.Db} databaseName 
     */
    constructor(client, databaseName) {
        this.Client = client;
        this.Db = this.Client.db(databaseName);
    }

    /**
     * @param {String} collectionName 
     * @returns {Collection}
     */
    collection(collectionName) {
        let dbCollection = this.Db.collection(collectionName);
        dbCollection.createIndex({ key: 1 });
        let collection = new Collection(dbCollection);

        return collection;
    }

    async dropCollection(collectionName) {
        let flag = await this.Db.dropCollection(collectionName);

        return flag;
    }
}

module.exports = Database;