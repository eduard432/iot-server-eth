export default function errorHandler(res, err) {
	console.log(err);
	res.status(500).json({
		ok: false,
		msg: 'Server error',
	});
}
