import { Router } from 'express';
import { body, header } from 'express-validator';

import { login, nonce, readSession } from '../controllers/user.controllers.js';
import { isValidAddress } from '../middlewares/validator/isValidAddress.js';
import { validateSignature } from '../middlewares/validateSignature.js';
import { validateFields } from '../middlewares/validateFields.js';
import { validateJwt } from '../middlewares/validateJwt.js';

const router = Router();

router.get('/nonce', nonce);
router.get('/session', readSession);
router.post(
	'/login',
	[
		body('publicAddress', '[publicAddress] is required').notEmpty(),
		body('publicAddress', '[publicAddress] must be a string').isString(),
		body('publicAddress').custom(isValidAddress),
		body('signature', '[signature] is required').notEmpty(),
		body('signature', '[signature] must be a string').isString(),
		validateFields,
		validateSignature,
	],
	login
);

router.get('/renew', [
	header('x-token', '[x-token] is required').isEmpty(),
	validateFields,
	validateJwt,
]);

export default router;
