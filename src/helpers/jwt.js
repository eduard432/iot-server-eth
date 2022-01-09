import jwt from 'jsonwebtoken';

export const generateToken = (uid) => {
	return new Promise((resolve, reject) => {
		const payload = { uid };

		jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '24h' }, (err, token) => {
			if (err) {
				console.log(err);
				reject('Error while generating token');
			} else {
				resolve(token);
			}
		});
	});
};
