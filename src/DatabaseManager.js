const mongoose = require("mongoose");
const Database = require("./structers/Database");

class DatabaseManager {
    /**
     * List of databases
     * @type {Array<Database>}
     */
    static Databases = [];

    /**
     * The address required to connect to Mongodb.
     * @param {String} connection
     */
    static async connect(connection){
        await mongoose.connect(connection, {useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true});
    }

    /**
     * It searches a database with the name you specified, if it doesn't exist, it creates and saves it to the list.
     * @param {String} databaseName
     * @param {String} collectionName
     * @returns {Database}
     */
    static getDatabase(databaseName, collectionName = "mongosha"){
        return this.Databases.find(database => database.Key === databaseName && database.Model.modelName == collectionName) || this.createDatabase(databaseName, collectionName);
    }

    /**
     * Creates and saves a database.
     * @param {String} databaseName
     * @param {String} collectionName
     * @returns {Database}
     */
    static createDatabase(databaseName, collectionName = undefined){
        let database = new Database(databaseName, collectionName);
        this.Databases.push(database);
        return database;
    }
}

module.exports = DatabaseManager;