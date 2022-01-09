import ethers from 'ethers';

export const isValidAddress = (address) => {
	if (!ethers.isAddress(address)) {
		throw new Error('[publicAddress] is invalid');
	}
};
