const mongoose = require("mongoose");
const Database = require("./structers/Database");

/**
 * List of databases
 * @type {Array<Database>}
 */
const Databases = [];

/**
 * The address required to connect to Mongodb.
 * @param {String} connection
 */
async function connect(connection, options = { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true }) {
    await mongoose.connect(connection, options);
}

/**
 * It searches a database with the name you specified, if it doesn't exist, it creates and saves it to the list.
 * @param {String} databaseName
 * @param {String} collectionName
 * @returns {Database}
 */
async function getDatabase(databaseName, collectionName = "mongosha") {
    return Databases.find(database => database.Key === databaseName && database.Model.modelName == collectionName) || this.createDatabase(databaseName, collectionName);
}

/**
 * Creates and saves a database.
 * @param {String} databaseName
 * @param {String} collectionName
 * @returns {Database}
 */
async function createDatabase(databaseName, collectionName = undefined) {
    let database = new Database(databaseName, collectionName);
    Databases.push(database);
    return database;
}

module.exports = {
    connect,
    getDatabase,
    createDatabase
};