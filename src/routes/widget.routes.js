import { Router } from 'express';
import { body, header } from 'express-validator';

import { validateFields } from '../middlewares/validateFields.js';
import { validateJwt } from '../middlewares/validateJwt.js';
import { isValidKey } from '../middlewares/validator/isValidKey.js';

import {
	createWidget,
	updateWidget,
	deleteWidget,
} from '../controllers/widget.controller.js';
import {
	validateUserDashboardBody,
	validateUserWidget,
} from '../middlewares/validateUser.js';

const router = Router();

// TODO: Mejorar types de widgets
// TODO: Agregar los position en el schema para saber el orden de los widgets

router.post(
	'/',
	[
		header('x-token', '[x-token] is required').isString(),
		body('key', '[key] is required').isString(),
		body('key').custom(isValidKey),
		body('name', '[name] is required').isString(),
		body('type', '[type] is required').isString(),
		body('config', '[config] is required').isObject(),
		body('data', '[data] is required').isArray(),
		validateFields,
		validateJwt,
		validateUserDashboardBody,
	],
	createWidget
);

router.put(
	'/',
	[
		header('x-token', '[x-token] is required').isString(),
		body('key', '[key] is required').isString(),
		body('key').custom(isValidKey),
		validateFields,
		validateJwt,
		validateUserWidget,
	],
	updateWidget
);

router.delete(
	'/',
	[
		header('x-token', '[x-token] is required').isString(),
		body('key', '[key] is required').isString(),
		body('key').custom(isValidKey),
		validateFields,
		validateJwt,
		validateUserWidget,
	],
	deleteWidget
);

export default router;
