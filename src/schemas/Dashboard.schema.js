import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const DashboardSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	key: {
		type: String,
		required: true,
	},
	lastVisited: {
		type: Boolean,
		default: false,
	},
	widgets: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Widget',
		},
	],
});

DashboardSchema.methods.toJSON = function () {
	const { __v, _id, user, ...dashboard } = this.toObject();
	return dashboard;
};

export default model('Dashboard', DashboardSchema);
