import errorHandler from '../helpers/errorHandler.js';
import Dashboard from '../schemas/Dashboard.schema.js';

import { v4 as uuid } from 'uuid';

export const createDashboard = async (req, res) => {
	try {
		const { name } = req.body;
		const user = req.uid;

		await Dashboard.updateMany(
			{ user, lastVisited: true },
			{ $set: { lastVisited: false } }
		);

		const dashboard = await Dashboard.create({
			user,
			name,
			lastVisited: true,
			key: uuid(),
		});

		res.status(201).json({
			ok: true,
			dashboard,
		});
	} catch (err) {
		errorHandler(res, err);
	}
};

export const getDashboards = async (req, res) => {
	try {
		const user = req.uid;

		const dashboards = await Dashboard.find({ user });
		const dashboardsMin = dashboards.map(({ name, lastVisited, key }) => ({
			name,
			lastVisited,
			key,
		}));

		res.json({
			ok: true,
			dashboards: dashboardsMin,
		});
	} catch (err) {
		errorHandler(res, err);
	}
};

export const getDashboard = async (req, res) => {
	try {
		const { dashboardKey } = req.params;
		const user = req.uid;

		await Dashboard.updateMany(
			{ user, lastVisited: true },
			{ $set: { lastVisited: false } }
		);

		const dashboard = await Dashboard.findOneAndUpdate(
			{
				user,
				key: dashboardKey,
			},
			{
				$set: { lastVisited: true },
			},
			{
				new: true,
			}
		).populate('widgets', '-__v -_id -user');

		res.json({
			ok: true,
			dashboard,
		});
	} catch (err) {
		errorHandler(res, err);
	}
};

export const deleteDashboard = async (req, res) => {
	try {
		const { dashboardKey } = req.params;
		const user = req.uid;

		const dashboard = await Dashboard.findOneAndDelete({ dashboardKey });

		if (dashboard.lastVisited) {
			const dashboards = await Dashboard.find({ user });
			if (dashboards.length === 0) {
				return res.json({
					ok: true,
					dashboard,
				});
			}

			await Dashboard.findByIdAndUpdate(dashboards[0]._id, {
				$set: { lastVisited: true },
			});
		}

		res.json({
			ok: true,
			dashboard,
		});
	} catch (err) {
		errorHandler(res, err);
	}
};

export const updateDashboard = async (req, res) => {
	try {
		const { key, name } = req.body;
		const user = req.uid;

		await Dashboard.updateMany({ user }, { $set: { lastVisited: false } });

		const dashboard = await Dashboard.findOneAndUpdate(
			{ key },
			{ $set: { name, lastVisited: true } },
			{ new: true }
		);

		res.json({
			ok: true,
			dashboard,
		});
	} catch (err) {
		errorHandler(res, err);
	}
};
