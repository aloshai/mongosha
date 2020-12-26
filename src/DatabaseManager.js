const mongoose = require("mongoose");
const Database = require("./structers/Database");

class DatabaseManager {
    /**
     * @type {Array<Database>}
     */
    static #Databases = [];

    /**
     * @param {String} connection 
     */
    static async connect(connection){
        await mongoose.connect(connection, {useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true});
    }

    /**
     * @param {String} databaseName 
     * @returns {Database}
     */
    static getDatabase(databaseName){
        return this.#Databases.find(database => database.Name == databaseName) || this.createDatabase(databaseName);
    }

    /**
     * @param {String} databaseName 
     * @returns {Database}
     */
    static createDatabase(databaseName){
        let database = new Database(databaseName);
        this.#Databases.push(database);
        return database;
    }
}

module.exports = DatabaseManager;