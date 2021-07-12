const mongoServices = require('./mongoService')
const User = require('../models/user');

exports.createUser = async (data) => {
	const newUser = await mongoServices.createUser(data)
	return newUser;
};

