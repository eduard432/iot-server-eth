import crypto from 'crypto';

import User from '../schemas/user.schema.js';
import errorHandler from '../helpers/errorHandler.js';

import { generateToken } from '../helpers/jwt.js';

export const nonce = (req, res) => {
	const message = crypto.randomInt(1111111, 9999999);
	req.session.nonce = message;

	res.json({
		ok: true,
		msg: `Sign the following message ${message}`,
		message,
	});
};

export const readSession = (req, res) => {
	res.send({
		ok: true,
		msg: req.session.nonce,
	});
};

export const login = async (req, res) => {
	try {
		const { address } = req.user;

		let user = await User.findOne({ address });

		if (!user) {
			user = User.create({ address });
		}

		const token = await generateToken(user.id);

		res.status(201).json({
			ok: true,
			user,
			token,
		});
	} catch (err) {
		errorHandler(res, err);
	}
};

export const renewToken = async (req, res) => {
	try {
		const uid = req.uid;
		const token = await generateToken(uid);
		const user = await User.findById(uid);

		res.json({
			ok: true,
			user,
			token,
		});
	} catch (err) {
		errorHandler(res, err);
	}
};
