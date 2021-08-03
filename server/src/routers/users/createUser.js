const { createUser } = require('../../services/userService')
const User = require('../../models/user');
const passport = require("passport")

module.exports = async (req, res, next) => {
	try {
		if (!req.user) {
			const { name, email, password } = req.body;
			const user = new User({ name, email });
			const registeredUser = await User.register(user, password);
			req.login(registeredUser, err => {
				if (err) return next(err);
				console.log('registered')
				res.cookie('username', req.user.name)
				res.cookie('userId', req.user._id.toString())
				res.cookie('email', req.user.email.toString())
				res.status(201).send(registeredUser);
			})
		}
		else {
			//flash error msgs here
			return res.send('already logged in')
		}
	} catch (error) {
		return res.status(500).send(error);
	}
};
