const { createUser } = require('../../services/userService')

module.exports = async (req, res) => {
	try {
		// console.log(req.body)
		if (!req.session.user) {
			const result = await createUser(req.body);
			req.session.user = result
			console.log(req.session.user)
			return res.status(201).send(result);
		}
		else {
			//flash error msgs here
			return res.send('already logged in')
		}
	} catch (error) {
		return res.status(500).send(error.message);
	}
};
