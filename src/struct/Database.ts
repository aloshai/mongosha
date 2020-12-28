import { MongoshaModel } from "../models/MongoshaModel";
import { Serialize } from "./Serialize";

export interface LooseObject {
	[prop: string]: any;
}

export class Database {
	public name: string;

	/**
	 * @param {String} name
	 */
	constructor(name: string) {
		this.name = name;
	}

	/**
	 * Set a value to the path you specify.
	 * @param {String} path The path where the transaction will be made.
	 * @param {any} value The value to be assigned to the path.
	 * @param {boolean} returnData Return the data in the field you updated?
	 * @returns {Object} If force is true, returns an object.
	 */
	public async set(
		path: string,
		value: any,
		returnData = false,
	): Promise<any> {
		path = this.formatPath(path);
		if (returnData)
			return Serialize.get(
				path,
				await MongoshaModel.findOneAndUpdate(
					{ key: this.name },
					{ $set: { [path]: value } },
					{ upsert: true, new: true },
				)
					.select(path)
					.exec(),
			);
		return MongoshaModel.updateOne(
			{ key: this.name },
			{ $set: { [path]: value } },
			{ upsert: true, new: true },
		).exec();
	}

	/**
	 * Returns value to you from the path you specified.
	 * @param {String} path The path where the transaction will be made.
	 */
	public async get(path: string): Promise<undefined | any> {
		path = this.formatPath(path);
		const doc = await MongoshaModel.findOne({ key: this.name }, { _id: 0 })
			.select(path)
			.exec();
		if (!doc) return undefined;
		const data = Serialize.get(path, doc);
		if (Object.keys(data).length === 0) return undefined;
		return data;
	}

	/**
	 * If the path you specify is an array, it pushes a value into the array.
	 * @param {String} path The path where the transaction will be made.
	 * @param {any} value The value to be pushed.
	 * @param {boolean} returnData Return the data in the field you updated?
	 * @returns {Array} If force is true, returns an updated array.
	 */
	public async push(
		path: string,
		value: any,
		returnData = false,
	): Promise<any | any[]> {
		path = this.formatPath(path);
		if (returnData)
			return Serialize.get(
				path,
				await MongoshaModel.findOneAndUpdate(
					{ key: this.name },
					{ $push: { [path]: value } },
					{ upsert: true, new: true },
				)
					.select(path)
					.exec(),
			);
		return await MongoshaModel.updateOne(
			{ key: this.name },
			{ $push: { [path]: value } },
			{ upsert: true, new: true },
		);
	}

	/**
	 * It checks to see if the path you specified exists.
	 * @param {String} path The path where the transaction will be made.
	 * @returns {Boolean} true or false
	 */
	public async has(path: string): Promise<boolean> {
		path = this.formatPath(path);
		return await MongoshaModel.exists({
			key: this.name,
			[path]: { $exists: true },
		}).then((val) => val);
	}

	/**
	 * Adds a numeric value in the path you specified.
	 * @param {String} path The path where the transaction will be made.
	 * @param {Number} value value to add.
	 * @returns {Number} returns an updated value
	 */
	public async add(path: string, value: number): Promise<number> {
		path = this.formatPath(path);
		return Serialize.get(
			path,
			await MongoshaModel.findOneAndUpdate(
				{ key: this.name },
				{ $inc: { [path]: value } },
				{ upsert: true, new: true },
			)
				.select(path)
				.exec(),
		);
	}

	/**
	 * @param {String} path The path where the transaction will be made.
	 * @param {Number} value value to subtract.
	 * @returns {Number} returns an updated value
	 */
	public async sub(path: string, value: number): Promise<number> {
		path = this.formatPath(path);
		return Serialize.get(
			path,
			await MongoshaModel.findOneAndUpdate(
				{ key: this.name },
				{ $inc: { [path]: -value } },
				{ upsert: true, new: true },
			)
				.select(path)
				.exec(),
		);
	}

	/**
	 * If the path you specified is an array, it will delete a value based on the query you specified.
	 * @param {String} path The path where the transaction will be made.
	 * @param {any} query The value to be pushed.
	 * @param {boolean} returnData Return the data in the field you updated?
	 * @returns {Array} If force is true, returns an updated array.
	 */
	public async pull(
		path: string,
		query: any,
		returnData = false,
	): Promise<any | any[]> {
		path = this.formatPath(path);
		if (returnData)
			return Serialize.get(
				path,
				await MongoshaModel.findOneAndUpdate(
					{ key: this.name },
					{ $pull: { [path]: query } },
					{ upsert: true, new: true },
				).exec(),
			);
		return MongoshaModel.updateOne(
			{ key: this.name },
			{ $pull: { [path]: query } },
			{ upsert: true, new: true },
		).exec();
	}

	/**
	 * @param {String} str
	 */
	private formatPath(str: string): string {
		if (!str.length) str = "value";
		else str = `value.${str}`;
		return str;
	}
}
