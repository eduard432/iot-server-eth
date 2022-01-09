import Dashboard from '../schemas/Dashboard.schema.js';
import Widget from '../schemas/Widget.schema.js';

import errorHandler from '../helpers/errorHandler.js';

export const validateUserDashboardBody = async (req, res, next) => {
	try {
		const { key } = req.body;
		const { uid } = req;

		const valid = await Dashboard.findOne({ key, user: uid });

		if (!valid) {
			return res.status(401).json({
				ok: false,
				message: 'Unathorized',
			});
		}

		next();
	} catch (err) {
		errorHandler(err);
	}
};

export const validateUserDashboard = async (req, res, next) => {
	try {
		const { dashboardKey } = req.params;
		const { uid } = req;

		const valid = await Dashboard.findOne({ key: dashboardKey, user: uid });

		if (!valid) {
			return res.status(401).json({
				ok: false,
				message: 'Unathorized',
			});
		}

		next();
	} catch (err) {
		errorHandler(err);
	}
};

export const validateUserWidget = async (req, res, next) => {
	try {
		const { key } = req.body;
		const { uid } = req;

		const valid = await Widget.findOne({ key, user: uid });

		if (!valid) {
			return res.status(401).json({
				ok: false,
				message: 'Unauthorized',
			});
		}

		next();
	} catch (err) {
		errorHandler(err);
	}
};
