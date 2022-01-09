import jwt from 'jsonwebtoken';

export const validateJwt = (req, res, next) => {
	try {
		const token = req.header('x-token');

		const { uid } = jwt.verify(token, process.env.JWT_KEY);

		req.uid = uid;

		next();
	} catch (err) {
		return res.status(401).json({
			ok: false,
			message: 'Invalid Token',
		});
	}
};
