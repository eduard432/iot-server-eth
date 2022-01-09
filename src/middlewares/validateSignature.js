import { recoverPersonalSignature } from '@metamask/eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';

export const validateSignature = (req, res, next) => {
	const { publicAddress, signature } = res.body;
	const msg = `Sign the following message ${req.session.nonce}`;

	const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));

	const address = recoverPersonalSignature({
		data: msgBufferHex,
		sig: signature,
	});

	if (address.toLoweCase() !== publicAddress) {
		return res.status(401).json({
			ok: false,
			error: 'Invalid address',
		});
	}

	req.user.address = address;
	next();
};
