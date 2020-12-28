import { model, Schema, Document } from "mongoose";

export interface IMongoshaDocument extends Document {
	key: string;
	value: {
		[prop: string]: any;
	};
}

export const MongoshaSchema = new Schema({
	key: {
		type: String,
		required: true,
	},
	value: {
		type: Object,
		required: true,
	},
});

export const MongoshaModel = model<IMongoshaDocument>(
	"mongosha",
	MongoshaSchema,
);
