import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const WidgetSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	dashboard: {
		type: Schema.Types.ObjectId,
		ref: 'Dashboard',
	},
	name: {
		type: String,
		required: true,
		default: 'My widget',
	},
	key: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	data: {
		type: Array,
		default: [],
	},
});

WidgetSchema.methods.toJSON = function () {
	const { __v, _id, ...Widget } = this.toObject();
	return Widget;
};

export default model('Widget', WidgetSchema);
