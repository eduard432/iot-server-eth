import { Router } from 'express';
import { body, header, param } from 'express-validator';

import { validateFields } from '../middlewares/validateFields.js';
import { validateJwt } from '../middlewares/validateJwt.js';
import { isValidKey } from '../middlewares/validator/isValidKey.js';
import {
	validateUserDashboardBody,
	validateUserDashboard,
} from '../middlewares/validateUser.js';

import {
	createDashboard,
	getDashboard,
	getDashboards,
	deleteDashboard,
	updateDashboard,
} from '../controllers/dashboard.controllers.js';

const router = Router();

router.post(
	'/new',
	[
		body('name', '[name] is required').isString(),
		header('x-token', '[x-token] is required').isString(),
		validateFields,
		validateJwt,
	],
	createDashboard
);

router.get(
	'/dashboards',
	[header('x-token', '[x-token] is required').isString(), validateFields, validateJwt],
	getDashboards
);

router.get(
	'/:dashboardKey',
	[
		header('x-token', '[x-token] is required').isString(),
		param('dashboardKey', '[dashboardKey] is required').isString(),
		param('dashboardKey').custom(isValidKey),
		validateFields,
		validateJwt,
		validateUserDashboard,
	],
	getDashboard
);

router.delete(
	'/:dashboardKey',
	[
		header('x-token', '[x-token] is required').isString(),
		param('dashboardKey', '[dashboardKey] is required').isString(),
		param('dashboardKey').custom(isValidKey),
		validateFields,
		validateJwt,
		validateUserDashboard,
	],
	deleteDashboard
);

router.put(
	'/',
	[
		header('x-token', '[x-token] is required').isString(),
		body('key', '[key] is required').isString(),
		body('key').custom(isValidKey),
		body('name', '[name] is required').isString(),
		validateFields,
		validateJwt,
		validateUserDashboardBody,
	],
	updateDashboard
);

export default router;
