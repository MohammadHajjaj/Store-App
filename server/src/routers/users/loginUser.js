const { findUser } = require('../../services/userService')

// module.exports = async (req, res, next) => {
// 	try {
// 		console.log(req.body)
// 		if (!req.session.user) {
// 			const result = await findUser(req.body);
// 			console.log(result[0])
// 			req.session.user = result[0]
// 			res.cookie('username', req.session.user.name)
// 			res.cookie('userId', req.session.user._id.toString())
// 			console.log(req.session.user)
// 			console.log(typeof (req.session.user._id))

// 			return res.status(201).send(result);
// 		}
// 		else {
// 			//flash error msgs here
// 			return res.send('already logged in')
// 		}
// 	} catch (error) {
// 		return res.status(500).send(error.message);
// 	}
// };



module.exports = async (req, res, next) => {
	try {
		console.log(req.body)
		res.cookie('username', req.user.name)
		res.cookie('userId', req.user._id.toString())
		res.cookie('email', req.user.email.toString())

		return res.status(201).send(req.user);

	} catch (error) {
		return res.status(500).send(error.message);
	}
};
