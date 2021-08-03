module.exports = async (req, res) => {
	try {
		// console.log(req.body)
		req.logout();
		res.clearCookie('connect.sid', { path: '/' })
		res.clearCookie("username")
		res.clearCookie("userId")
		res.clearCookie("email")
		return res.status(201).send("logged out");

	} catch (error) {
		return res.status(500).send(error);
	}
};
