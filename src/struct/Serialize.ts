export interface LooseObject {
	[prop: string]: any;
}

export class Serialize {
	/**
	 * @param {String} path
	 * @param {any} value
	 * @param {Object} obj
	 */
	static set(path: string, value: any, obj: LooseObject = {}): LooseObject {
		const targets = path.split(".");
		let ref = obj;
		for (const target of targets) {
			if (ref[target]) ref = ref[target];
			else ref = ref[target] = {};
		}
		ref[targets[targets.length - 1]] = value;
		return ref;
	}

	/**
	 * @param {String} path
	 * @param {Object} obj
	 */
	static get(path: string, obj: LooseObject = {}): any {
		const targets = path.split(".");
		let ref = obj;
		for (const target of targets) {
			if (ref[target]) ref = ref[target];
			else break;
		}
		return ref;
	}
}
