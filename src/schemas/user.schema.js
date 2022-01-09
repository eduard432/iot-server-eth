import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const UserSchema = new Schema({
	publicAddress: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		default: 'User 1',
	},
	email: {
		type: String,
		unique: true,
	},
});

UserSchema.methods.toJSON = function () {
	const { __v, _id, address, ...user } = this.toObject();
	user.uid = address;
	return user;
};

export default model('User', UserSchema);
