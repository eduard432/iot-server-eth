import { validate, version } from 'uuid';

export const isValidKey = (key) => {
	if (!validate(key)) {
		throw new Error('[key] is invalid');
	}

	if (version(key) !== 4) {
		throw new Error('[key] is invalid');
	}

	return true;
};
