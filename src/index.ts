import mongoose from "mongoose";
import { Database } from "./struct/Database";

export { Database };
export class DatabaseManager {
	/**
	 * List of databases
	 * @type {Array<Database>}
	 */
	static Databases: Database[] = [];

	/**
	 * The address required to connect to Mongodb.
	 * @param {String} connection
	 */
	static async connect(connection: string): Promise<void> {
		await mongoose.connect(connection, {
			useFindAndModify: false,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	}

	/**
	 * It searches a database with the name you specified, if it doesn't exist, it creates and saves it to the list.
	 * @param {String} databaseName
	 * @returns {Database}
	 */
	static getDatabase(databaseName: string): Database {
		return (
			this.Databases.find((database) => database.name === databaseName) ||
			this.createDatabase(databaseName)
		);
	}

	/**
	 * Creates and saves a database.
	 * @param {String} databaseName
	 * @returns {Database}
	 */
	static createDatabase(databaseName: string): Database {
		const database = new Database(databaseName);
		this.Databases.push(database);
		return database;
	}
}
