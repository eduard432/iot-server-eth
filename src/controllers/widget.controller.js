import errorHandler from '../helpers/errorHandler.js';

import Widget from '../schemas/Widget.schema.js';
import Dashboard from '../schemas/Dashboard.schema.js';

import { v4 as uuid } from 'uuid';

export const createWidget = async (req, res) => {
	try {
		const { key, name, type, config, data } = req.body;
		const user = req.uid;

		const dashboardId = await Dashboard.findOne({ key });

		const widget = await Widget.create({
			user,
			dashboard: dashboardId,
			name,
			type,
			config,
			data,
			key: uuid(),
		});

		await Dashboard.updateMany({ user }, { $set: { lastVisited: false } });

		const dashboard = await Dashboard.findOneAndUpdate(
			{ key },
			{
				$push: {
					widgets: widget._id,
				},
				$set: {
					lastVisited: true,
				},
			},
			{ new: true }
		).populate('widgets', '-__v -_id -user -dashboard');

		return res.status(201).json({
			ok: true,
			dashboard,
		});
	} catch (err) {
		errorHandler(res, err);
	}
};

export const updateWidget = async (req, res) => {
	try {
		const { key, name, type, config, data } = req.body;
		const user = req.uid;

		await Dashboard.updateMany({ user }, { $set: { lastVisited: false } });

		const widget = await Widget.findOneAndUpdate(
			key,
			{ name, type, config, data },
			{ new: true }
		);

		await Dashboard.findOneAndUpdate(
			{ key: widget.dashboard },
			{
				$pull: {
					widgets: widget._id,
				},
				$set: {
					lastVisited: true,
				},
			},
			{ new: true }
		);

		return res.status(200).json({
			ok: true,
			widget,
		});
	} catch (err) {
		errorHandler(res, err);
	}
};

export const deleteWidget = async (req, res) => {
	try {
		const { key } = req.body;
		const user = req.uid;

		await Dashboard.updateMany({ user }, { $set: { lastVisited: false } });

		const widget = await Widget.findOneAndDelete({ key });

		await Dashboard.findOneAndUpdate(
			{ key: widget.dashboard },
			{
				$pull: {
					widgets: widget._id,
				},
				$set: {
					lastVisited: true,
				},
			},
			{ new: true }
		);

		return res.status(200).json({
			ok: true,
			widget,
		});
	} catch (err) {
		errorHandler(res, err);
	}
};
